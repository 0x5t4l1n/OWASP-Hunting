# Website follow-up issue screenshots — 2026-10-27

Baseline: OWASP/OWASP-Hunting website at ac81655f4ac3aa1250023a3a9a5e3a93c00ac059.

All three screenshots were captured locally in Chromium at 1366x900. Red rectangles, numbered labels, and panels headed AUDIT ANNOTATION are temporary browser overlays added solely to explain the evidence. They are not website UI changes or implemented features. No website source was modified for these reports and no PR is being opened from this evidence-only branch.

- `reduced-motion-marked.png`: emulated prefers-reduced-motion=reduce; matchMedia returned true while computed HTML scroll-behavior remained smooth. The screenshot demonstrates browser preference/CSS state, not a measurement of perceived motion or animation duration.
- `numbered-instructions-marked.png`: /docs/usage/ Burp Suite steps originate as Markdown items 1–5, but the five rendered list items have a DIV parent and computed list-style-type=disc. The red rectangle identifies the group whose numbering is lost.
- `per-example-copy-enhancement-marked.png`: /payloads/sql-injection/ contains a section-level Copy action and no individual-row copy buttons. The second marking shows the requested enhancement; no per-example button was inserted.

Payload strings remained inert reference text. No payload was executed against a target, and no clipboard copy was triggered. Existing development diagnostics from previously reported nested-button issue #36 can appear in the screenshots; they are not new findings in these reports.