# Website audit issue screenshots — 2026-10-28

Baseline: OWASP/OWASP-Hunting website at ac81655f4ac3aa1250023a3a9a5e3a93c00ac059.

All screenshots were captured locally in Chromium at 1366x900. Red rectangles, numbered labels, and panels headed AUDIT ANNOTATION are temporary browser overlays added solely to explain the evidence. They are not website UI changes or implemented features. No website source was modified for these reports and no PR is being opened from this evidence-only branch.

- `doc-blockquote-rendering-marked.png`: /docs/installation/ contains markdown blockquote `> The upstream OWASP repository...`. In the rendered DOM, it appears as `<p><br>&gt; ...</p>` without an enclosing `<blockquote>`. CSS in `globals.css` targeting `.prose blockquote` is never applied.
- `broken-contributors-link-marked.png`: /community/ includes a link to "Contributors Hall of Fame" pointing to `https://github.com/owasp/owasp-hunting/blob/main/CONTRIBUTORS.md`. The target file does not exist in the repository, resulting in an HTTP 404 response on GitHub.
- `payload-card-truncation-marked.png`: /payloads/ displays vulnerability category cards. The description paragraphs have an inline style `maxWidth: "200px"`, causing text like "Database query manipulation through unsanitized input" to truncate with an ellipsis even when 60px+ of horizontal space remains inside the card, and without a `title` tooltip.
