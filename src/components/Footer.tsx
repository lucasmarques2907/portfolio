import { socials } from "@/lib/links";
import { SessionTimer } from "./SessionTimer";
import { ViewCounter } from "./ViewCounter";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="m-auto mx-4 md:mx-0 mb-5 bg-crust text-subtext0 border-surface0/20 flex h-auto flex-col items-center justify-center gap-y-3 rounded-lg border p-5 text-xs lg:text-sm md:flex-row md:justify-between md:gap-y-0">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
        <span className="whitespace-nowrap">
          &copy; {year} Lucas Vinícius Marques
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 md:justify-end">
        <SessionTimer />
        <span className="text-surface2" aria-hidden>|</span>
        <ViewCounter />
        <span className="text-surface2" aria-hidden>|</span>
        <ul className="flex items-center gap-3">
          {socials.map(({ key, label, href, Icon }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-foreground/60 transition-colors hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
