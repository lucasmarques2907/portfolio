"use client";

import { useEffect, useState } from "react";

const TAG_COLORS = [
  "text-red-200",
  "text-orange-200",
  "text-amber-200",
  "text-yellow-200",
  "text-lime-200",
  "text-green-200",
  "text-emerald-200",
  "text-teal-200",
  "text-cyan-200",
  "text-sky-200",
  "text-blue-200",
  "text-indigo-200",
  "text-violet-200",
  "text-purple-200",
  "text-fuchsia-200",
  "text-pink-200",
  "text-rose-200",
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
