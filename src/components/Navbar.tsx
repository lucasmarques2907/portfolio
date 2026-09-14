"use client";

import { useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { navLinks } from "@/lib/links";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavDrawer } from "./NavDrawer";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 flex h-24 items-center justify-between bg-background/70 p-5 pb-10 backdrop-blur-sm select-none">
        <Breadcrumb />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir navegação"
          aria-expanded={open}
          aria-controls="sidebar-nav"
          className="cursor-pointer rounded p-2 text-foreground hover:text-primary md:hidden"
        >
          <Menu className="size-6" />
        </button>

        <nav className="hidden items-center space-x-4 md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:text-primary"
            >
              {label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir mais itens de navegação"
            className="cursor-pointer rounded px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
          >
            Ver Mais...
          </button>
        </nav>
      </div>
      <NavDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
