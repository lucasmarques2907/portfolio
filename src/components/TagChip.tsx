"use client";

import { useEffect, useState } from "react";

const TAG_COLORS = [
  "text-rosewater",
  "text-flaming",
  "text-pink",
  "text-mauve",
  "text-red",
  "text-maroon",
  "text-peach",
  "text-yellow",
  "text-green",
  "text-teal",
  "text-sky",
  "text-sapphire",
  "text-blue",
  "text-lavender",
] as const;

export function TagChip({ tag }: { tag: string }) {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    setColor(TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]);
  }, []);

  return (
    <li
      className={`rounded bg-surface px-2 py-0.5 text-xs font-semibold ${color ?? "text-foreground/80"}`}
    >
      {tag}
    </li>
  );
}
