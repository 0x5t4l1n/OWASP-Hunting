import { GithubIcon } from "@/components/ui/GithubIcon";
import Link from "next/link";
import { OwaspIcon } from "@/components/ui/OwaspIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PAYLOAD_CATEGORIES, PAYLOAD_PAGES } from "@/lib/payload-data";
import { SITE_CONFIG } from "@/lib/navigation";
import {
  BookOpen,
  Code2,
  Shield,
  ExternalLink,
  ArrowRight,
  Terminal,
  Search,
  GitBranch,
} from "lucide-react";

export const metadata = {
  title: "OWASP Hunting — Security Testing Documentation",
  description:
    "Documentation for the OWASP Hunting project. A comprehensive collection of security testing resources and payloads for authorized penetration testing and bug bounty research.",
};

const FEATURES = [
  {
    icon: <Code2 size={18} aria-hidden />,
    title: "Payload Reference",
    desc: "Organized payload collections across 30+ vulnerability classes, with testing context and methodology.",
  },
  {
    icon: <BookOpen size={18} aria-hidden />,
    title: "Methodology Guides",
    desc: "Testing methodology, tooling guidance, and structured approaches to web application security.",
  },
  {
    icon: <Terminal size={18} aria-hidden />,
    title: "Technical Depth",
    desc: "Attack vectors, indicators, detection guidance, and mitigation strategies for each vulnerability.",
  },
  {
    icon: <Search size={18} aria-hidden />,
    title: "Fast Search",
    desc: "Search across payloads, documentation, and methodology with keyboard-first navigation.",
  },
  {
    icon: <GitBranch size={18} aria-hidden />,
    title: "Open Source",
    desc: "Contributing is encouraged. Content lives in the upstream OWASP Hunting repository.",
  },
  {
    icon: <Shield size={18} aria-hidden />,
    title: "Ethical Focus",
    desc: "All content oriented toward authorized testing, responsible disclosure, and defense.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          style={{
            borderBottom: "1px solid var(--color-line)",
            padding: "4rem 1.5rem 3.5rem",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Project badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.25rem 0.75rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-line)",
                borderRadius: "20px",
                fontSize: "0.75rem",
                color: "var(--color-ink-muted)",
                marginBottom: "1.75rem",
                letterSpacing: "0.03em",
              }}
            >
              <OwaspIcon size={16} aria-hidden style={{ color: "rgba(255,255,255,0.8)" }} />
              <span style={{ color: "var(--color-ink-muted)" }}>OWASP Hunting — Security Testing Reference</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--color-ink)",
                letterSpacing: "-0.025em",
                margin: "0 0 1.25rem",
              }}
            >
              Security Testing
              <br />
              <span style={{ color: "var(--color-accent)" }}>Resources & Payloads</span>
            </h1>

            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--color-ink-secondary)",
                lineHeight: 1.7,
                margin: "0 0 2rem",
                maxWidth: "580px",
              }}
            >
              A comprehensive collection of security testing resources and payloads for
              authorized penetration testing, bug bounty research, and security education.
              Documentation for the{" "}
              <a
                href={SITE_CONFIG.upstreamRepo}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-accent)", textDecoration: "none" }}
              >
                OWASP Hunting project
              </a>
              .
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/docs/getting-started"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                }}
              >
                <BookOpen size={16} aria-hidden />
                Browse Documentation
              </Link>
              <Link
                href="/payloads"
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-ink-secondary)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                <Code2 size={16} aria-hidden />
                Explore Payloads
              </Link>
              <a
                href={SITE_CONFIG.upstreamRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--color-ink-secondary)",
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                }}
              >
                <GithubIcon size={16} aria-hidden />
                View on GitHub
                <ExternalLink size={12} aria-hidden style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>
        </section>

        {/* Vulnerability categories */}
        <section
          style={{
            padding: "3rem 1.5rem",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  margin: "0 0 0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Vulnerability Categories
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", margin: 0 }}>
                {PAYLOAD_PAGES.length} payload classes organized by attack category
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {PAYLOAD_CATEGORIES.map((cat) => (
                <CategoryGroup key={cat.slug} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section
          style={{
            padding: "3rem 1.5rem",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-ink)",
                margin: "0 0 2rem",
                letterSpacing: "-0.01em",
              }}
            >
              What&rsquo;s inside
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  style={{
                    padding: "1.25rem",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-line)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.625rem",
                      color: "var(--color-accent)",
                    }}
                  >
                    {f.icon}
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-ink)",
                      }}
                    >
                      {f.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-ink-secondary)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Repository links */}
        <section
          style={{
            padding: "3rem 1.5rem",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-ink)",
                margin: "0 0 0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Source Repositories
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-ink-muted)",
                margin: "0 0 1.5rem",
              }}
            >
              This documentation covers the OWASP Hunting project. Payloads and content originate from the upstream repository.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
              }}
            >
              <RepoCard
                label="Upstream Repository"
                sublabel="Canonical OWASP project"
                href={SITE_CONFIG.upstreamRepo}
                badge="OWASP"
                badgeColor="var(--color-info)"
              />
              <RepoCard
                label="Development Fork"
                sublabel="Active development and contributions"
                href={SITE_CONFIG.forkRepo}
                badge="Fork"
                badgeColor="var(--color-ink-muted)"
              />
            </div>
          </div>
        </section>

        {/* Purpose & responsible use */}
        <section style={{ padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    margin: "0 0 0.75rem",
                  }}
                >
                  Who this is for
                </h2>
                <ul
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-ink-secondary)",
                    lineHeight: 1.8,
                    paddingLeft: "1.25rem",
                    margin: 0,
                  }}
                >
                  <li>Penetration testers conducting authorized assessments</li>
                  <li>Bug bounty hunters working in-scope programs</li>
                  <li>Security engineers building defensive tooling</li>
                  <li>Students learning web application security</li>
                  <li>Researchers studying vulnerability classes</li>
                  <li>Open-source security contributors</li>
                </ul>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <Shield
                    size={16}
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  />
                  <h2
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--color-ink)",
                      margin: 0,
                    }}
                  >
                    Responsible Use
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-ink-secondary)",
                    lineHeight: 1.7,
                    margin: "0 0 0.75rem",
                  }}
                >
                  All content is intended for{" "}
                  <strong style={{ color: "var(--color-ink)" }}>authorized testing only</strong>.
                  Use these resources responsibly.
                </p>
                <ul
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-ink-secondary)",
                    lineHeight: 1.8,
                    paddingLeft: "1.25rem",
                    margin: 0,
                  }}
                >
                  <li>Systems you own or have explicit written permission to test</li>
                  <li>Authorized bug bounty programs with defined scope</li>
                  <li>Educational labs and controlled environments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CategoryGroup({
  category,
}: {
  category: (typeof PAYLOAD_CATEGORIES)[number];
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-line)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "0.75rem 1rem",
          borderBottom: "1px solid var(--color-line)",
          backgroundColor: "var(--color-surface-raised)",
        }}
      >
        <h3
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--color-ink-secondary)",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {category.name}
        </h3>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: "0.375rem 0" }}>
        {category.items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/payloads/${item.slug}`}
              className="hvr-nav"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.375rem 1rem",
                borderRadius: "4px",
                fontSize: "0.8125rem",
                color: "var(--color-ink-secondary)",
                textDecoration: "none",
              }}
            >
              {item.title}
              <ArrowRight size={12} style={{ opacity: 0.4 }} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoCard({
  label,
  sublabel,
  href,
  badge,
  badgeColor,
}: {
  label: string;
  sublabel: string;
  href: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 1.25rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-line)",
        borderRadius: "8px",
        textDecoration: "none",
      }}
    >
      <GithubIcon size={22} style={{ color: "var(--color-ink-secondary)", flexShrink: 0 }} aria-hidden />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.125rem",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-ink)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "0.125rem 0.4rem",
              borderRadius: "3px",
              border: `1px solid ${badgeColor}`,
              color: badgeColor,
              opacity: 0.8,
            }}
          >
            {badge}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--color-ink-muted)",
            margin: 0,
          }}
        >
          {sublabel}
        </p>
      </div>
      <ExternalLink size={14} style={{ color: "var(--color-ink-muted)", flexShrink: 0 }} aria-hidden />
    </a>
  );
}
