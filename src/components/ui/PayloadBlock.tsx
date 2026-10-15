"use client";


import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PayloadSection {
  label: string;
  payloads: string[];
}

interface PayloadBlockProps {
  sections: PayloadSection[];
  language?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

function SinglePayloadBlock({ section }: { section: PayloadSection }) {
  const text = section.payloads.join("\n");

  return (
    <div className="payload-block">
      <div className="payload-block-header">
        <span>{section.label}</span>
        <CopyButton text={text} label="Copy all" />
      </div>
      <div className="payload-block-content">
        {section.payloads.map((payload, i) => (
          <span
            key={i}
            className={`payload-line ${payload.startsWith("#") ? "payload-comment" : ""}`}
          >
            {payload}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PayloadBlock({
  sections,
  collapsible = false,
  defaultExpanded = true,
}: PayloadBlockProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!collapsible) {
    return (
      <div>
        {sections.map((section) => (
          <SinglePayloadBlock key={section.label} section={section} />
        ))}
      </div>
    );
  }

  const allPayloads = sections.flatMap((s) => s.payloads).join("\n");
  const totalCount = sections.flatMap((s) => s.payloads).filter((p) => !p.startsWith("#") && p.trim()).length;

  return (
    <div
      style={{
        border: "1px solid var(--color-code-border)",
        borderRadius: "6px",
        overflow: "hidden",
        margin: "1rem 0",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0.625rem 0.875rem",
          backgroundColor: "var(--color-surface)",
          border: "none",
          cursor: "pointer",
          color: "var(--color-ink-secondary)",
          fontSize: "0.8125rem",
        }}
        aria-expanded={expanded}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {expanded ? <ChevronDown size={14} aria-hidden /> : <ChevronRight size={14} aria-hidden />}
          {totalCount} payloads across {sections.length} section{sections.length !== 1 ? "s" : ""}
        </span>
        <CopyButton text={allPayloads} label="Copy all" />
      </button>
      {expanded && (
        <div>
          {sections.map((section) => (
            <SinglePayloadBlock key={section.label} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
