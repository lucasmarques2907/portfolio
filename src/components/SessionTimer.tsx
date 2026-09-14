"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function format(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        setSeconds((s) => s + 1);
      }
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5"
    title="Tempo navegando pelo site"
    >
      <Clock className="size-3.5 shrink-0 text-subtext1" aria-hidden />
      <time className="text-primary tabular-nums">{format(seconds)}</time>
    </span>
  );
}
