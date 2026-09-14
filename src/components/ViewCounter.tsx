"use client";

import { useEffect, useRef, useState } from "react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    fetch("/api/views", { method: "POST" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { count: number }) => setViews(data.count))
      .catch(() => setViews(null));
  }, []);

  return (
    <span className='tabulnar-nums text-subtext0'>
      {views === null ? "-" : views.toLocaleString("pt-BR")} views
    </span>
  );
}
