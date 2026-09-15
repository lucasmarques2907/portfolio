"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { navLinks, navSecondary } from "@/lib/links";
import { ThemePicker } from "./theme/ThemePicker";

export function NavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-crust/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="sidebar-nav"
        role="dialog"
        aria-label="Navegação"
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-50 h-full w-72 border-l border-surface0 bg-mantle p-6 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="font-bold text-primary">Navegação</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            tabIndex={open ? 0 : -1}
            className="cursor-pointer text-foreground/60 transition-colors hover:text-primary"
          >
            <X className="size-5" />
          </button>
        </div>

        <ThemePicker tabIndex={open ? 0 : -1} className="mt-8" />

        <div className="my-6 border-t border-surface0" />

        <nav className="mt-8">
          <ul className="space-y-4">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-6 border-t border-surface0" />

          <ul className="space-y-4">
            {navSecondary.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
