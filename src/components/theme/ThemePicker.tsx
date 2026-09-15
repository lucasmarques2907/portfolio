// src/components/theme/ThemePicker.tsx
"use client";

import { Palette } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FLAVOR_LABELS, FLAVORS, PRIMARY_COLORS } from "@/lib/theme";

type ThemePickerProps = {
  tabIndex?: number;
  className?: string;
};

type Box = { top: number; left: number; size: number };

export function ThemePicker({
  tabIndex = 0,
  className = "",
}: ThemePickerProps) {
  const { flavor, primary, setTheme, ready } = useTheme();

  const gridRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [box, setBox] = useState<Box | null>(null);

  const measure = useCallback(() => {
    const swatch = swatchRefs.current[primary];
    if (!swatch) return;

    setBox({
      top: swatch.offsetTop,
      left: swatch.offsetLeft,
      size: swatch.offsetWidth,
    });
  }, [primary]);

  useLayoutEffect(() => {
    measure();

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(measure);
    observer.observe(grid);

    return () => observer.disconnect();
  }, [measure]);

  return (
    <div className={className}>
      <h3 className="text-text mb-4 flex items-center gap-2 text-sm font-semibold">
        <Palette size={16} className="text-primary" aria-hidden />
        Theme
      </h3>

      <div
        role="radiogroup"
        aria-label="Flavour"
        className="ring-surface0 mb-4 flex flex-wrap items-center gap-1 rounded-md p-1 ring-1"
      >
        {FLAVORS.map((f) => {
          const selected = ready && flavor === f;

          return (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={tabIndex}
              onClick={() => setTheme({ flavor: f })}
              className={`flex-1 cursor-pointer rounded-[5px] px-2 py-1 text-center text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                selected
                  ? "bg-mantle text-text ring-primary/70 shadow-sm ring-1 ring-inset"
                  : "text-subtext1 hover:text-subtext0"
              }`}
            >
              {FLAVOR_LABELS[f]}
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        role="radiogroup"
        aria-label="Cor primária"
        className="relative grid grid-cols-7 gap-2.5 md:gap-1.5"
      >
        {PRIMARY_COLORS.map((c) => {
          const selected = ready && primary === c;

          return (
            <button
              key={c}
              ref={(el) => {
                swatchRefs.current[c] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              title={c[0].toUpperCase() + c.slice(1)}
              tabIndex={tabIndex}
              onClick={() => setTheme({ primary: c })}
              style={{ backgroundColor: `var(--catppuccin-color-${c})` }}
              className={`aspect-square min-h-5 w-full min-w-5 cursor-pointer rounded-md shadow-sm transition-all duration-150 ${
                selected
                  ? "scale-100"
                  : "opacity-80 hover:scale-110 hover:opacity-100"
              }`}
            >
              <span className="sr-only">{c}</span>
            </button>
          );
        })}

        {box && (
          <div
            aria-hidden
            data-theme-animate="transform"
            style={{
              width: box.size,
              height: box.size,
              transform: `translate(${box.left}px, ${box.top}px)`,
            }}
            className={`outline-primary pointer-events-none absolute top-0 left-0 rounded-md outline-2 outline-offset-2 ${
              ready ? "transition-transform duration-300 ease-out" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
}

export function ThemePickerCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-surface0 bg-base flex flex-col justify-center rounded-xl border p-4 shadow-lg ${className}`}
    >
      <ThemePicker />
    </div>
  );
}