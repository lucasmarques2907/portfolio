"use client";

import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "click-counter:mine";

export function ClickMeButton() {
  type Float = { id: number; left: number; drift: number };
  const [floats, setFloats] = useState<Float[]>([]);
  const floatId = useRef(0);

  const [total, setTotal] = useState<number | null>(null);
  const [optimistic, setOptimistic] = useState(0);
  const [mine, setMine] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  const latest = useRef(0);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isFinite(saved) && saved > 0) setMine(saved);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, String(mine));
  }, [mine]);

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { count: number }) => {
        latest.current = data.count;
        setTotal(data.count);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (cooldown < 1) return;
    const id = setTimeout(() => setCooldown((n) => n - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleClick = async () => {
    if (cooldown > 0) return;

    const float: Float = {
      id: floatId.current++,
      left: 10 + Math.random() * 80,
      drift: Math.random() * 60 - 30,
    };

    setFloats((list) => [...list.slice(-24), float]);

    setOptimistic((n) => n + 1);
    setMine((n) => n + 1);

    try {
      const res = await fetch("/api/clicks", { method: "POST" });
      const data = (await res.json()) as { count: number; retryAfter?: number };

      if (res.status === 429) {
        setMine((n) => n - 1);
        setCooldown(data.retryAfter ?? 5);
      }

      if (data.count > latest.current) {
        latest.current = data.count;
        setTotal(data.count);
      }
    } catch {
      setMine((n) => n - 1);
    } finally {
      setOptimistic((n) => n - 1);
    }
  };

  const display = total === null ? null : total + optimistic;
  const locked = cooldown > 0;

  return (
    <div className='border-surface0 bg-base relative flex flex-col justify-between rounded-xl border p-4 shadow-lg md:col-span-3 lg:col-span-1'>
      <div className='group absolute top-3 right-3'>
        <button
          type='button'
          aria-label='O que é isso?'
          className='text-subtext1 group-hover:text-primary group-focus-within:text-primary transition-colors'
        >
          <Info size={16} aria-hidden='true' />
        </button>

        <div
          role='tooltip'
          className='border-primary/20 text-subtext0 invisible absolute top-7 right-0 z-10 w-56 rounded-lg border p-3 text-xs opacity-0 shadow-xl backdrop-blur-md bg-base/70 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'
        >
          <p>
            Um contador global em tempo real que soma cada clique de todo mundo
            que visitou esse site. Completamente inútil, mas satisfatório.
          </p>
        </div>
      </div>

      <div className='flex h-full flex-col items-center justify-center py-2'>
        <div className='relative mb-3'>
          <div className='pointer-events-none absolute right-0 bottom-1/2 left-0 h-40'>
            {floats.map((float) => (
              <span
                key={float.id}
                onAnimationEnd={() =>
                  setFloats((list) =>
                    list.filter((item) => item.id !== float.id),
                  )
                }
                style={
                  {
                    left: `${float.left}%`,
                    "--drift": `${float.drift}px`,
                  } as React.CSSProperties
                }
                className='float-up text-primary/70 absolute bottom-0 text-lg font-bold select-none'
              >
                {" "}
                +1
              </span>
            ))}
          </div>

          <span className='text-primary block text-3xl font-bold tabular-nums'>
            {display === null ? "-" : display.toLocaleString("pt-BR")}
          </span>
        </div>

        <button
          type='button'
          onClick={handleClick}
          disabled={locked}
          className='bg-primary hover:bg-primary/90 active:bg-primary/80 text-crust focus-visible:ring-primary/50 focus-visible:ring-offset-base cursor-pointer rounded-xl px-6 py-3 font-bold transition-all duration-150 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
        >
          {locked ? `AGUARDE ${cooldown}s` : "CLICK ME"}
        </button>

        <p className='text-subtext1 mt-6 text-xs'>
          você clicou {mine} {mine === 1 ? "vez" : "vezes"}
        </p>
      </div>
    </div>
  );
}
