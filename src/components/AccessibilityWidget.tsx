import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

// ── Types ────────────────────────────────────────────────
type SimpleFeatureId =
  | "biggerText"
  | "highContrast"
  | "highlightLinks"
  | "dyslexia"
  | "pauseAnimations"
  | "lineHeight"
  | "textSpacing"
  | "hideImages"
  | "tooltips";

type CursorMode = "big" | "mask" | "guide";
type TextAlign = "left" | "center" | "right";

interface SavedState {
  simple: Partial<Record<SimpleFeatureId, boolean>>;
  cursorMode: CursorMode | null;
  textAlign: TextAlign | null;
}

// ── Simple toggle features ───────────────────────────────
const simpleFeatures: {
  id: SimpleFeatureId;
  label: string;
  cssClass: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "biggerText",
    label: "Bigger Text",
    cssClass: "acc-bigger-text",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <text x="1" y="15" fontSize="10" fontWeight="bold">
          T
        </text>
        <text x="10" y="20" fontSize="15" fontWeight="bold">
          T
        </text>
      </svg>
    ),
  },
  {
    id: "highContrast",
    label: "High Contrast",
    cssClass: "acc-high-contrast",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "highlightLinks",
    label: "Highlight Links",
    cssClass: "acc-highlight-links",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "dyslexia",
    label: "Dyslexia Friendly",
    cssClass: "acc-dyslexia",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    id: "pauseAnimations",
    label: "Pause Animations",
    cssClass: "acc-pause-animations",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="9" />
        <line x1="10" y1="8" x2="10" y2="16" />
        <line x1="14" y1="8" x2="14" y2="16" />
      </svg>
    ),
  },
  {
    id: "lineHeight",
    label: "Line Height",
    cssClass: "acc-line-height",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
        <polyline points="8 3 3 6 8 9" />
        <polyline points="8 15 3 18 8 21" />
      </svg>
    ),
  },
  {
    id: "textSpacing",
    label: "Text Spacing",
    cssClass: "acc-text-spacing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <line x1="3" y1="3" x2="3" y2="21" />
        <line x1="21" y1="3" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    id: "hideImages",
    label: "Hide Images",
    cssClass: "acc-hide-images",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    id: "tooltips",
    label: "Tooltips",
    cssClass: "acc-tooltips",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

// ── Cursor sub-options ───────────────────────────────────
const cursorOptions: {
  id: CursorMode;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "big",
    label: "Big Cursor",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M5 3l14 9-7 1-4 7L5 3z" />
      </svg>
    ),
  },
  {
    id: "mask",
    label: "Reading Mask",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="9" width="20" height="6" rx="1" />
        <rect
          x="2"
          y="2"
          width="20"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.3"
          stroke="none"
        />
        <rect
          x="2"
          y="15"
          width="20"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.3"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: "guide",
    label: "Reading Guide",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <line x1="2" y1="12" x2="22" y2="12" strokeWidth="3" />
        <line x1="2" y1="8" x2="22" y2="8" opacity="0.3" />
        <line x1="2" y1="16" x2="22" y2="16" opacity="0.3" />
      </svg>
    ),
  },
];

// ── Text align options ───────────────────────────────────
const alignOptions: { id: TextAlign; label: string; icon: React.ReactNode }[] =
  [
    {
      id: "left",
      label: "Left",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
      ),
    },
    {
      id: "center",
      label: "Center",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="6" y1="12" x2="18" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      ),
    },
    {
      id: "right",
      label: "Right",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="9" y1="12" x2="21" y2="12" />
          <line x1="6" y1="18" x2="21" y2="18" />
        </svg>
      ),
    },
  ];

// ── Reading Mask overlay ─────────────────────────────────
function ReadingMask() {
  const [y, setY] = useState(200);
  const bandHeight = 80;

  useEffect(() => {
    const handler = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const topHeight = Math.max(0, y - bandHeight / 2);
  const bottomTop = y + bandHeight / 2;

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      <div
        className="absolute inset-x-0 top-0 bg-black/55"
        style={{ height: topHeight }}
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-black/55"
        style={{ top: bottomTop }}
      />
    </div>
  );
}

// ── Reading Guide overlay ────────────────────────────────
function ReadingGuide() {
  const [y, setY] = useState(200);

  useEffect(() => {
    const handler = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="fixed inset-x-0 z-[9997] pointer-events-none"
      style={{
        top: y - 1,
        height: 3,
        backgroundColor: "#2a7c8a",
        opacity: 0.75,
      }}
    />
  );
}

// ── Helpers ──────────────────────────────────────────────
const STORAGE_KEY = "weloc-accessibility";

function loadSaved(): SavedState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return { simple: {}, cursorMode: null, textAlign: null };
  }
}

const defaultSimple: Record<SimpleFeatureId, boolean> = {
  biggerText: false,
  highContrast: false,
  highlightLinks: false,
  dyslexia: false,
  pauseAnimations: false,
  lineHeight: false,
  textSpacing: false,
  hideImages: false,
  tooltips: false,
};

// ── Section label ────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 px-1 mt-1 mb-1">
      {label}
    </p>
  );
}

// ── Main widget ──────────────────────────────────────────
export default function AccessibilityWidget() {
  const saved = loadSaved();

  const [open, setOpen] = useState(false);
  const [simple, setSimple] = useState<Record<SimpleFeatureId, boolean>>({
    ...defaultSimple,
    ...saved.simple,
  });
  const [cursorMode, setCursorMode] = useState<CursorMode | null>(
    saved.cursorMode ?? null,
  );
  const [textAlign, setTextAlign] = useState<TextAlign | null>(
    saved.textAlign ?? null,
  );

  // Apply simple feature CSS classes
  useEffect(() => {
    const html = document.documentElement;
    simpleFeatures.forEach(({ id, cssClass }) => {
      html.classList.toggle(cssClass, simple[id]);
    });
  }, [simple]);

  // Apply cursor mode CSS class
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("acc-cursor-big", cursorMode === "big");
  }, [cursorMode]);

  // Apply text align CSS class
  useEffect(() => {
    const html = document.documentElement;
    (["left", "center", "right"] as TextAlign[]).forEach((a) => {
      html.classList.toggle(`acc-text-${a}`, textAlign === a);
    });
  }, [textAlign]);

  // Image alt tooltips (JS-driven because CSS ::after doesn't work on <img>)
  useEffect(() => {
    if (!simple.tooltips) return;

    let tip: HTMLDivElement | null = null;

    const show = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;
      const alt = (target as HTMLImageElement).alt;
      if (!alt) return;

      tip = document.createElement("div");
      tip.textContent = alt;
      Object.assign(tip.style, {
        position: "fixed",
        background: "#1e293b",
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "11px",
        fontWeight: "500",
        zIndex: "10001",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        top: `${e.clientY - 36}px`,
        left: `${e.clientX}px`,
        transform: "translateX(-50%)",
      });
      document.body.appendChild(tip);
    };

    const move = (e: MouseEvent) => {
      if (!tip) return;
      tip.style.top = `${e.clientY - 36}px`;
      tip.style.left = `${e.clientX}px`;
    };

    const hide = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;
      tip?.remove();
      tip = null;
    };

    document.addEventListener("mouseover", show);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseout", hide);

    return () => {
      document.removeEventListener("mouseover", show);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseout", hide);
      tip?.remove();
    };
  }, [simple.tooltips]);

  // Persist to localStorage
  useEffect(() => {
    const state: SavedState = { simple, cursorMode, textAlign };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [simple, cursorMode, textAlign]);

  const toggleSimple = (id: SimpleFeatureId) =>
    setSimple((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleCursor = (mode: CursorMode) =>
    setCursorMode((prev) => (prev === mode ? null : mode));

  const toggleAlign = (align: TextAlign) =>
    setTextAlign((prev) => (prev === align ? null : align));

  const resetAll = () => {
    setSimple({ ...defaultSimple });
    setCursorMode(null);
    setTextAlign(null);
  };

  const anyActive =
    Object.values(simple).some(Boolean) ||
    cursorMode !== null ||
    textAlign !== null;

  // ── Button styles ──────────────────────────────────────
  const tileBase =
    "flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all text-[11px] font-semibold leading-tight";
  const tileOn = "border-blue-600 bg-blue-50 text-blue-700";
  const tileOff =
    "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100";

  const chipBase =
    "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl border-2 text-[10px] font-semibold transition-all";
  const chipOn = "border-blue-600 bg-blue-50 text-blue-700";
  const chipOff =
    "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-slate-100";

  return (
    <>
      {/* Overlays (outside panel, full viewport) */}
      {cursorMode === "mask" && <ReadingMask />}
      {cursorMode === "guide" && <ReadingGuide />}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[17rem] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="bg-slate-800 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <FontAwesomeIcon icon={faPerson} className="text-white" />
              <span className="text-white font-bold text-sm">
                Accessibility Menu
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-3.5 py-3 space-y-3">
            {/* Simple toggles grid */}
            <div>
              <SectionLabel label="Display" />
              <div className="grid grid-cols-2 gap-2">
                {simpleFeatures.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => toggleSimple(f.id)}
                    className={`${tileBase} ${simple[f.id] ? tileOn : tileOff} ${
                      i === simpleFeatures.length - 1 &&
                      simpleFeatures.length % 2 !== 0
                        ? "col-span-2"
                        : ""
                    }`}
                  >
                    {f.icon}
                    <span>{f.label}</span>
                    {simple[f.id] && (
                      <span className="text-[9px] font-bold tracking-wider uppercase text-blue-500">
                        On
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor section */}
            <div>
              <SectionLabel label="Cursor" />
              <div className="flex gap-2">
                {cursorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleCursor(c.id)}
                    className={`${chipBase} ${cursorMode === c.id ? chipOn : chipOff}`}
                  >
                    {c.icon}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text align section */}
            <div>
              <SectionLabel label="Text Align" />
              <div className="flex gap-2">
                {alignOptions.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAlign(a.id)}
                    className={`${chipBase} ${textAlign === a.id ? chipOn : chipOff}`}
                  >
                    {a.icon}
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-3.5 py-3 border-t border-slate-100 shrink-0 space-y-2">
            <button
              onClick={resetAll}
              disabled={!anyActive}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
              </svg>
              Reset All Settings
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              WELOC Loans Accessibility Tools
            </p>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open accessibility menu"
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full shadow-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
      >
        <FontAwesomeIcon icon={faPerson} className="text-white text-2xl" />
        {anyActive && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
        )}
      </button>
    </>
  );
}
