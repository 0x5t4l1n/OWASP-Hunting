# Clickjacking

## Description
Clickjacking (UI redressing) tricks a user into clicking something different from what they perceive, typically by loading a target page in a transparent or disguised `<iframe>` layered over decoy content. If the target page doesn't prevent framing, an attacker can hijack genuine clicks to trigger unintended actions on the victim's behalf.

## Common Issues
- Missing `X-Frame-Options` header
- Missing or permissive `Content-Security-Policy: frame-ancestors`
- Framebusting relying only on client-side JavaScript (bypassable)
- Sensitive state-changing actions reachable via a single click with no re-authentication/CSRF token check

## Common Attack Vectors
- Account settings pages (email/password change, OAuth consent)
- "Like"/"follow"/"share" social action buttons
- Single-click purchase or fund-transfer buttons
- Drag-and-drop interfaces (drag content into an attacker-controlled drop target)
- File upload dialogs disguised under decoy UI ("filejacking")

## Testing Approach
1. Check response headers for `X-Frame-Options` and `Content-Security-Policy: frame-ancestors` on the target page.
2. If absent or set to a weak value, attempt to load the page in an iframe from an external origin.
3. Confirm actual framing succeeds (some browsers/extensions block framing independently of headers — verify in a clean browser profile).
4. Build a PoC overlaying a decoy UI element over the real action you want to hijack, and confirm the click reaches the framed page.

## Payloads
See `clickjacking-payloads.txt` for PoC HTML templates and header-based detection notes.
