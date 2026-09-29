"use client";

import React from "react";
import type { DeviceKind, LinkKind } from "@/lib/netsim/types";

export function DeviceIcon({ kind, size = 44 }: { kind: DeviceKind; size?: number }) {
  const s = { width: size, height: size };
  switch (kind) {
    case "router":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <circle cx="24" cy="24" r="21" fill="oklch(0.24 0.05 163)" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <path d="M10 30 h28 M10 24 h28 M10 18 h28" stroke="oklch(0.75 0.14 163)" strokeWidth="1.2" />
          <path d="M34 30 l6 6 M34 24 l8 8 M34 18 l6 6" stroke="oklch(0.75 0.14 163)" strokeWidth="1.2" />
          <path d="M8 24 a16 16 0 0 1 32 0" fill="none" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <circle cx="24" cy="24" r="3" fill="oklch(0.85 0.16 163)" />
        </svg>
      );
    case "switch":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="5" y="16" width="38" height="17" rx="3" fill="oklch(0.25 0.06 163)" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <rect x="5" y="9" width="38" height="6" rx="2" fill="oklch(0.3 0.07 163)" stroke="oklch(0.75 0.14 163)" strokeWidth="1.5" />
          <g fill="oklch(0.8 0.15 163)">
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={9 + i * 6} y="19" width="3.5" height="11" rx="1" />
            ))}
          </g>
        </svg>
      );
    case "hub":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="5" y="19" width="38" height="14" rx="3" fill="oklch(0.28 0.05 70)" stroke="oklch(0.78 0.15 70)" strokeWidth="2" />
          <g fill="oklch(0.8 0.13 70)">
            {Array.from({ length: 5 }).map((_, i) => (
              <circle key={i} cx={11 + i * 7} cy="26" r="2.4" />
            ))}
          </g>
        </svg>
      );
    case "pc":
    case "laptop":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          {kind === "pc" ? (
            <>
              <rect x="9" y="8" width="30" height="22" rx="2" fill="oklch(0.22 0.04 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="2" />
              <rect x="13" y="12" width="22" height="14" fill="oklch(0.35 0.12 163)" />
              <rect x="18" y="30" width="12" height="4" fill="oklch(0.3 0.05 260)" />
              <rect x="12" y="34" width="24" height="4" rx="1.5" fill="oklch(0.25 0.05 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="1.5" />
            </>
          ) : (
            <>
              <rect x="8" y="10" width="32" height="20" rx="2" fill="oklch(0.22 0.04 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="2" />
              <rect x="12" y="14" width="24" height="12" fill="oklch(0.35 0.12 163)" />
              <path d="M6 32 h36 l2 5 H4 z" fill="oklch(0.28 0.05 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="1.5" />
            </>
          )}
        </svg>
      );
    case "server":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="10" y="6" width="28" height="36" rx="3" fill="oklch(0.22 0.04 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="2" />
          <g fill="oklch(0.3 0.06 260)">
            <rect x="14" y="11" width="20" height="8" rx="1.5" />
            <rect x="14" y="21" width="20" height="8" rx="1.5" />
            <rect x="14" y="31" width="20" height="7" rx="1.5" />
          </g>
          <g fill="oklch(0.8 0.15 163)">
            <circle cx="17.5" cy="15" r="1.5" />
            <circle cx="17.5" cy="25" r="1.5" />
            <circle cx="17.5" cy="34.5" r="1.5" />
          </g>
        </svg>
      );
    case "smartphone":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="15" y="5" width="18" height="38" rx="4" fill="oklch(0.22 0.04 260)" stroke="oklch(0.8 0.1 260)" strokeWidth="2" />
          <rect x="18" y="10" width="12" height="26" fill="oklch(0.35 0.12 163)" />
          <circle cx="24" cy="39.5" r="1.6" fill="oklch(0.8 0.1 260)" />
        </svg>
      );
    case "ap":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="16" y="26" width="16" height="7" rx="2" fill="oklch(0.25 0.06 163)" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <path d="M14 22 a14 14 0 0 1 20 0" fill="none" stroke="oklch(0.75 0.14 163)" strokeWidth="2.4" />
          <path d="M18 17 a9 9 0 0 1 12 0" fill="none" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <circle cx="24" cy="26" r="1.6" fill="oklch(0.85 0.16 163)" />
        </svg>
      );
    case "wirelessRouter":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <rect x="8" y="24" width="32" height="12" rx="3" fill="oklch(0.25 0.06 163)" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <path d="M16 20 a12 12 0 0 1 16 0" fill="none" stroke="oklch(0.75 0.14 163)" strokeWidth="2.2" />
          <path d="M20 15 a7 7 0 0 1 8 0" fill="none" stroke="oklch(0.75 0.14 163)" strokeWidth="2" />
          <g fill="oklch(0.8 0.15 163)">
            <circle cx="13" cy="30" r="1.8" />
            <circle cx="19" cy="30" r="1.8" />
            <circle cx="25" cy="30" r="1.8" />
            <circle cx="31" cy="30" r="1.8" />
          </g>
          <path d="M36 24 v-8 h4" stroke="oklch(0.75 0.14 163)" strokeWidth="2" fill="none" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 48 48" style={s} aria-hidden>
          <path d="M12 34 a8 8 0 0 1 .5-16 A11 11 0 0 1 34 15 a8.5 8.5 0 0 1 2 19 z" fill="oklch(0.27 0.04 250)" stroke="oklch(0.8 0.1 250)" strokeWidth="2" />
          <g fill="oklch(0.75 0.12 163)">
            <circle cx="17" cy="30" r="1.6" />
            <circle cx="24" cy="30" r="1.6" />
            <circle cx="31" cy="30" r="1.6" />
          </g>
        </svg>
      );
  }
}

export const linkStyle = (kind: LinkKind): { color: string; dash: string; width: number } => {
  switch (kind) {
    case "wireless":
      return { color: "#a855f7", dash: "2 6", width: 2.5 };
    case "serial":
      return { color: "#f59e0b", dash: "0", width: 3.5 };
    case "fiber":
      return { color: "#0d9488", dash: "0", width: 3 };
    case "console":
      return { color: "#64748b", dash: "1 3", width: 2 };
    case "crossover":
      return { color: "#e11d48", dash: "8 4", width: 2.5 };
    default:
      return { color: "#10b981", dash: "0", width: 2.5 };
  }
};

export const protoColor = (proto: string): string => {
  switch (proto) {
    case "ICMP": return "#f59e0b";
    case "ARP": return "#84cc16";
    case "DHCP": return "#a855f7";
    case "DNS": return "#e11d48";
    case "TCP": return "#0d9488";
    case "HTTP": return "#22c55e";
    default: return "#64748b";
  }
};
