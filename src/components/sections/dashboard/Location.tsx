"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MapPin, Sun, Moon } from "lucide-react";

const CITY = "Joinville, SC";
const TIMEZONE = "America/Sao_Paulo";

const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => <div className='bg-surface0 h-full w-full animate-pulse' />,
});

export function Location() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: TIMEZONE,
          hour12: false,
        }),
      );
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const hour = Number(time?.slice(0, 2) ?? -1);
  const isDay = hour >= 6 && hour < 18;

  return (
    <div className='border-surface0 bg-base flex flex-col rounded-xl border p-4 shadow-lg md:col-span-2 lg:col-span-2'>
      <h3 className='text-text mb-3 flex items-center gap-2 text-sm font-semibold'>
        <MapPin size={16} className='text-primary' aria-hidden='true' />
        Onde estou 📍
      </h3>

      <div className='bg-surface0 relative min-h-32 w-full flex-1 overflow-hidden rounded-lg'>
        <LocationMap />
      </div>

      <div className='mt-3 flex items-center justify-between gap-2'>
        <span
          className='text-subtext0 text-xs whitespace-nowrap'
          title='Mapa © OpenStreetMap, tiles por CARTO'
        >
          {CITY}
        </span>

        <div className='flex items-center gap-1'>
          {isDay ? (
            <Sun size={12} className='text-yellow' aria-hidden='true' />
          ) : (
            <Moon size={12} className='text-lavender' aria-hidden='true' />
          )}
          <span className='text-primary font-mono text-xs whitespace-nowrap tabular-nums'>
            {time ?? "--:--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}
