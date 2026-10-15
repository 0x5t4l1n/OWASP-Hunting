import { Sidebar, MobileSidebar } from "./Sidebar";
import { NavSection } from "@/lib/navigation";

interface DocsLayoutProps {
  children: React.ReactNode;
  toc?: React.ReactNode;
  navSections: NavSection[];
  wide?: boolean;
}

export function DocsLayout({ children, toc, navSections, wide }: DocsLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 52px)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Left sidebar — desktop only */}
      <aside className="docs-sidebar" aria-label="Documentation sidebar">
        <Sidebar sections={navSections} />
      </aside>

      {/* Main content */}
      <main
        id="main-content"
        style={{
          flex: 1,
          minWidth: 0,
          padding: wide ? "2rem 2rem" : "2rem 2.5rem",
          maxWidth: wide ? "100%" : "820px",
        }}
      >
        {/* Mobile nav toggle */}
        <div className="mobile-nav-trigger" style={{ marginBottom: "1.5rem" }}>
          <MobileSidebar sections={navSections} />
        </div>

        {children}
      </main>

      {/* Right TOC — desktop only, only when provided */}
      {toc && (
        <aside className="docs-toc" aria-label="Page contents">
          {toc}
        </aside>
      )}
    </div>
  );
}
