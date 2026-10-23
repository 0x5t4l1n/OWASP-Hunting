"""Offline regression tests; never execute payloads or call GitHub."""
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import check_duplicates as checker


class DuplicateCheckTests(unittest.TestCase):
    def collect(self, files, contents):
        with patch.object(checker, "api_request", return_value={"merge_base_commit": {"sha": "base"}}), \
             patch.object(checker, "get_pr_files", return_value=files), patch.object(
            checker, "get_file_content",
            side_effect=lambda api, repo, path, ref, token: contents[(path, ref)],
        ):
            return checker.collect_pr_changes("api", "owner/repo", 1, "head", "base", "token")

    def test_modified_file_uses_actual_line_and_complete_content(self):
        base = "\n".join(["# heading"] * 99 + ["existing"])
        head = base + "\n++payload\n--payload\n@@payload"
        candidates, _ = self.collect(
            [{"status": "modified", "filename": "X/test.txt", "patch": "truncated"}],
            {("X/test.txt", "base"): base, ("X/test.txt", "head"): head},
        )
        self.assertEqual([(e.text, loc.line) for e, loc in candidates],
                         [("++payload", 101), ("--payload", 102), ("@@payload", 103)])

    def test_added_file_line_numbers_include_comments_and_blanks(self):
        candidates, _ = self.collect(
            [{"status": "added", "filename": "X/new.txt"}],
            {("X/new.txt", "head"): "# heading\n\npayload"},
        )
        self.assertEqual(candidates[0][1].line, 3)

    def test_move_from_deleted_file_does_not_fail(self):
        candidates, removed = self.collect(
            [{"status": "removed", "filename": "X/old.txt"},
             {"status": "added", "filename": "X/new.txt"}],
            {("X/old.txt", "base"): "payload", ("X/new.txt", "head"): "payload"},
        )
        entry = checker.to_entry("payload")
        loc = checker.Location("X/old.txt", 1, "payload")
        strict, ws = {entry.strict_key: [loc]}, {entry.ws_key: [loc]}
        for path, entries in removed.items():
            checker.remove_base_occurrences(strict, ws, path, entries)
        self.assertEqual(checker.find_duplicates(candidates, strict, ws), [])

    def test_rename_out_of_payload_extension_removes_base(self):
        candidates, removed = self.collect(
            [{"status": "renamed", "previous_filename": "X/old.txt", "filename": "X/new.md"}],
            {("X/old.txt", "base"): "payload"},
        )
        self.assertEqual(candidates, [])
        self.assertEqual(removed["X/old.txt"], [checker.to_entry("payload")])

    def test_rename_into_payload_extension_checks_all_lines(self):
        candidates, _ = self.collect(
            [{"status": "renamed", "previous_filename": "X/old.md", "filename": "X/new.txt"}],
            {("X/new.txt", "head"): "# heading\npayload"},
        )
        self.assertEqual(candidates[0][1].line, 2)

    def test_same_file_reorder_is_not_new(self):
        candidates, removed = self.collect(
            [{"status": "modified", "filename": "X/test.txt"}],
            {("X/test.txt", "base"): "one\ntwo", ("X/test.txt", "head"): "two\none"},
        )
        self.assertEqual(candidates, [])
        self.assertEqual(removed["X/test.txt"], [])

    def test_extra_occurrence_is_detected(self):
        candidates, _ = self.collect(
            [{"status": "modified", "filename": "X/test.txt"}],
            {("X/test.txt", "base"): "payload", ("X/test.txt", "head"): "payload\npayload"},
        )
        loc = checker.Location("X/test.txt", 1, "payload")
        self.assertEqual(len(checker.find_duplicates(candidates, {"payload": [loc]}, {})), 1)

    def test_whitespace_is_preserved_and_matches_are_advisory(self):
        first, second = checker.to_entry(" payload  x "), checker.to_entry("payload x")
        self.assertNotEqual(first.strict_key, second.strict_key)
        matches = checker.find_duplicates(
            [(first, checker.Location("X/new.txt", 3, first.text))], {},
            {second.ws_key: [checker.Location("X/old.txt", 1, second.text)]},
        )
        self.assertEqual(matches[0].kind, "whitespace/format duplicate")

    def test_unreadable_base_fails_instead_of_skipping(self):
        with tempfile.TemporaryDirectory() as folder:
            (Path(folder) / "payload.txt").write_text("payload")
            with patch.object(Path, "read_bytes", side_effect=OSError("unreadable")):
                with self.assertRaisesRegex(RuntimeError, "Cannot read payload file"):
                    checker.build_base_indexes(Path(folder))

    def test_missing_api_content_fails(self):
        with patch.object(checker, "api_request", return_value={"encoding": "none", "content": ""}):
            with self.assertRaisesRegex(RuntimeError, "Cannot read complete"):
                checker.get_file_content("api", "repo", "X/test.txt", "sha", "token")

    def test_diverged_target_uses_merge_base_for_diff(self):
        with patch.object(checker, "get_pr_files", return_value=[
                {"status": "modified", "filename": "X/test.txt"}]), \
             patch.object(checker, "api_request", return_value={
                 "merge_base_commit": {"sha": "ancestor"}}), \
             patch.object(checker, "get_file_content", side_effect=lambda api, repo, path, ref, token:
                 {"ancestor": "old", "head": "old\nnew"}[ref]) as content:
            candidates, _ = checker.collect_pr_changes("api", "repo", 1, "head", "target", "token")
            self.assertEqual(candidates[0][0].text, "new")
            self.assertEqual(content.call_args_list[0].args[3], "ancestor")

    def test_empty_api_file_is_valid(self):
        with patch.object(checker, "api_request", return_value={"encoding": "base64", "content": ""}):
            self.assertEqual(checker.get_file_content("api", "repo", "X/test.txt", "sha", "token"), "")

    def test_main_advisory_passes_and_exact_duplicate_fails(self):
        for kind, expected in [("whitespace/format duplicate", 0), ("exact duplicate", 1)]:
            with self.subTest(kind=kind), patch.dict(checker.os.environ,
                    {"GITHUB_TOKEN": "test", "GITHUB_REPOSITORY": "owner/repo"}), \
                 patch.object(checker, "load_event_payload", return_value={"pull_request": {
                     "number": 1, "head": {"sha": "head"}, "base": {"sha": "base"}}}), \
                 patch.object(checker, "build_base_indexes", return_value=({}, {})), \
                 patch.object(checker, "collect_pr_changes", return_value=([], {})), \
                 patch.object(checker, "find_duplicates", return_value=[checker.Duplicate(
                     kind, "payload", checker.Location("old", 1, "payload"),
                     checker.Location("new", 2, "payload"))]), \
                 patch.object(checker, "upsert_pr_comment"), \
                 patch.object(checker, "set_duplicate_label") as label, \
                 patch("builtins.print"):
                self.assertEqual(checker.main(), expected)
                self.assertEqual(label.call_args.kwargs["has_duplicates"], bool(expected))


if __name__ == "__main__":
    unittest.main()
