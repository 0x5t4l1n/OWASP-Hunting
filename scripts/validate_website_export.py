"""Check that exported HTML resolves local links and assets under GitHub Pages."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


BASE_PATH = "/OWASP-Hunting"
EXPORT = Path("out")


class References(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.urls.append(value)


def main() -> None:
    if not (EXPORT / "index.html").is_file():
        raise SystemExit("Missing out/index.html")
    if not (EXPORT / ".nojekyll").is_file():
        raise SystemExit("Missing out/.nojekyll")
    if (EXPORT / "CNAME").exists():
        raise SystemExit("Unexpected custom domain in export")

    pages = list(EXPORT.rglob("*.html"))
    errors: set[str] = set()
    checked = 0
    for page in pages:
        parser = References()
        parser.feed(page.read_text(encoding="utf-8"))
        for url in parser.urls:
            if not url.startswith("/") or url.startswith("//"):
                continue
            path = unquote(urlsplit(url).path)
            if path != BASE_PATH and not path.startswith(BASE_PATH + "/"):
                errors.add(f"{page}: missing base path: {url}")
                continue
            relative = path.removeprefix(BASE_PATH).lstrip("/")
            target = EXPORT / relative
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                errors.add(f"{page}: missing target: {url}")
            checked += 1

    if errors:
        raise SystemExit("\n".join(sorted(errors)))
    print(f"Validated {len(pages)} HTML pages and {checked} local references")


if __name__ == "__main__":
    main()
