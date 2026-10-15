"use client";


import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : label}
      title={copied ? "Copied!" : label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.25rem 0.5rem",
        fontSize: "0.6875rem",
        fontFamily: "var(--font-mono)",
        color: copied ? "var(--color-success)" : "var(--color-ink-muted)",
        backgroundColor: "transparent",
        border: "1px solid transparent",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "color 0.15s, border-color 0.15s, background-color 0.15s",
        letterSpacing: "0.03em",
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          const el = e.currentTarget;
          el.style.color = "var(--color-ink-secondary)";
          el.style.backgroundColor = "var(--color-surface-raised)";
          el.style.borderColor = "var(--color-line)";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          const el = e.currentTarget;
          el.style.color = "var(--color-ink-muted)";
          el.style.backgroundColor = "transparent";
          el.style.borderColor = "transparent";
        }
      }}
    >
      {copied ? (
        <>
          <Check size={12} aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy size={12} aria-hidden />
          Copy
        </>
      )}
    </button>
  );
}
