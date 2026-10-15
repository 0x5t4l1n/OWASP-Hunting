import { GithubIcon } from "@/components/ui/GithubIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/navigation";
import { ExternalLink, Shield } from "lucide-react";

export const metadata = {
  title: "About",
  description: "About the OWASP Hunting project — a curated collection of security testing resources and payloads.",
};

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main id="main-content" style={{ flex: 1, maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem", width: "100%" }}>
        <div className="prose">
          <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--color-line)" }}>
            <h1>About OWASP Hunting</h1>
            <p style={{ fontSize: "1rem", color: "var(--color-ink-secondary)", margin: 0 }}>
              A comprehensive collection of security testing resources and payloads for authorized security testing.
            </p>
          </div>

          <h2 id="project-overview">Project Overview</h2>
          <p>
            OWASP Hunting is an open-source security testing reference covering over 30 vulnerability
            classes. It provides curated payloads, testing methodology, and documentation for security
            professionals conducting authorized assessments.
          </p>
          <p>
            The project is organized by vulnerability type, with each category containing a README
            explaining the attack vector, testing approach, and a payload file for use in authorized
            testing environments.
          </p>

          <h2 id="repository">Repository</h2>
          <p>
            The canonical source is the{" "}
            <a href={SITE_CONFIG.upstreamRepo} target="_blank" rel="noopener noreferrer">
              upstream OWASP Hunting repository
            </a>
            . This documentation site is derived from that repository and is not operated by OWASP directly.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
              margin: "1.25rem 0",
            }}
          >
            {[
              {
                label: "Upstream Repository",
                desc: "Canonical OWASP project — the authoritative source",
                href: SITE_CONFIG.upstreamRepo,
                badge: "OWASP",
              },
              {
                label: "Development Fork",
                desc: "Active development fork and contributions",
                href: SITE_CONFIG.forkRepo,
                badge: "Fork",
              },
            ].map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "7px",
                  textDecoration: "none",
                }}
              >
                <GithubIcon size={20} style={{ color: "var(--color-ink-secondary)", flexShrink: 0 }} />
                <div>
                  <p style={{ margin: "0 0 0.125rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-ink)" }}>
                    {r.label}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-ink-muted)" }}>
                    {r.desc}
                  </p>
                </div>
                <ExternalLink size={13} style={{ color: "var(--color-ink-muted)", flexShrink: 0, marginLeft: "auto" }} />
              </a>
            ))}
          </div>

          <h2 id="purpose">Purpose</h2>
          <p>OWASP Hunting serves as a reference for security professionals to:</p>
          <ul>
            <li>Test web applications for common vulnerability classes</li>
            <li>Learn about different attack vectors and techniques</li>
            <li>Prepare for authorized bug bounty hunting</li>
            <li>Conduct structured penetration testing</li>
            <li>Understand security risks and their mitigations</li>
          </ul>

          <h2 id="coverage">Coverage</h2>
          <p>The project covers vulnerability classes across six categories:</p>
          <ul>
            <li><strong>Injection</strong> — SQL, NoSQL, XSS, Command, SSTI, SSJI, CSV, LDAP, Log, XML, Prompt, Prototype Pollution</li>
            <li><strong>Access Control</strong> — Path Traversal, IDOR, Open Redirect</li>
            <li><strong>Authentication & Authorization</strong> — Auth Bypass, Password Reset, Weak Passwords</li>
            <li><strong>Server-Side</strong> — SSRF, Deserialization, File Upload, Symbolic Link, Timing Attacks</li>
            <li><strong>Configuration & Design</strong> — Misconfiguration, CORS, HTTP Smuggling, JWT, Business Logic, Crypto, Vulnerable Components</li>
            <li><strong>Network & Anonymity</strong> — Tor-Based Attacks</li>
          </ul>

          <h2 id="license">License</h2>
          <p>
            OWASP Hunting is released under the{" "}
            <a href={`${SITE_CONFIG.upstreamRepo}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
              MIT License
            </a>
            . While the repository is open source, all content is for educational and authorized testing
            purposes only. See the{" "}
            <a href={`${SITE_CONFIG.upstreamRepo}/blob/main/DISCLAIMER.md`} target="_blank" rel="noopener noreferrer">
              project disclaimer
            </a>{" "}
            before use.
          </p>

          <h2 id="responsible-use">Responsible Use</h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              padding: "1rem 1.25rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              borderTop: "3px solid var(--color-accent)",
              borderRadius: "0 0 6px 6px",
            }}
          >
            <Shield size={16} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-ink)" }}>
                For authorized testing only
              </p>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-ink-secondary)", lineHeight: 1.6 }}>
                All payloads and techniques are for use on systems you own, authorized penetration
                testing engagements, approved bug bounty programs, and controlled educational environments.
                Unauthorized access to computer systems is illegal. The project maintainers are not
                responsible for misuse.
              </p>
            </div>
          </div>

          <h2 id="quick-links">Quick Links</h2>
          <ul>
            <li><Link href="/docs/getting-started">Getting Started</Link></li>
            <li><Link href="/payloads">Payload Reference</Link></li>
            <li><Link href="/contributing">How to Contribute</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li>
              <a href="https://owasp.org" target="_blank" rel="noopener noreferrer">OWASP Foundation</a>
            </li>
            <li>
              <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top 10</a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
