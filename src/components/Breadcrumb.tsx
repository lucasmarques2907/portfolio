"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumbs">
      <ul className="text-md flex items-center">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="text-primary transition-colors duration-150 hover:text-primary/40"
          >
            ~
          </Link>
        </li>

        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          const href = "/" + segments.slice(0, 1 + i).join("/");

          return (
            <li key={href} className="inline-flex items-center">
              <span className="mx-0.5" aria-hidden>
                /
              </span>
              {isLast ? (
                <span className="text-foreground">{segment}</span>
              ) : (
                <Link
                  href={href}
                  className="text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}

        <li className="mx-0.5 inline-flex items-center" aria-hidden>
          /
        </li>
        <li className="ml-1 inline-flex items-center">
          <span className="cursor-blink h-4 w-2 bg-primary" aria-hidden />
        </li>
      </ul>
    </nav>
  );
}
