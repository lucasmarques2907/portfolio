"use client";

import { Experience } from "@/lib/experience";
import { CalendarDays, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ExperienceItem({ experience }: { experience: Experience }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-lg px-2 py-1.5 cursor-pointer transition-opacity hover:opacity-80 ${open ? "opacity-80" : ""}`}
      >
        <Image
          src={experience.logo}
          alt=""
          width={40}
          height={28}
          className="h-auto w-7"
        />
        <span className="text-sm text-foreground">{experience.name}</span>
      </button>

      {open && (
        <>
          <div
            role="dialog"
            aria-label={experience.name}
            className="absolute bottom-full left-0 z-30 mb-2 w-max max-w-xs rounded-xl border border-surface0 bg-mantle p-4 shadow-xl"
          >
            <div className="flex items-center justify-between gap-2.5">
              <Image
                src={experience.logo}
                alt=""
                width={40}
                height={28}
                className="h-auto w-7"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">
                  {experience.name}
                </p>
                <p className="truncate text-sm text-foreground/60">
                  {experience.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="self-start shrink-0 cursor-pointer text-subtext1 transition-colors hover:text-primary p-1"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {experience.description}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-foreground/50">
              <CalendarDays className="size-3.5 shrink-0" aria-hidden />
              {experience.period}
            </div>

            <a
              href={experience.href}
              target="_blank"
              rel="noopener noferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary transition-opacity hover:opacity-80"
            >
              Visitar Site
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>

          <div
            aria-hidden
            className="absolute bottom-full left-1/2  size-3 mb-0.5 rotate-45 bg-primary"
          ></div>
        </>
      )}
    </div>
  );
}
