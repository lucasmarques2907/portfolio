import { links, socials } from "@/lib/links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="space-y-5 px-4 md:px-0">
      <h1 className="text-3xl font-bold md:text-4xl">Eae!</h1>

      <p className="leading-relaxed text-foreground/80">
        Meu nome é <span className="text-primary font-semibold">Lucas Vinícius Marques</span>, desenvolvedor de software na{" "}
        <a
          href={links.job.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Evolve Tecnologia
        </a>
        . Trabalho com web (Vue e React) e mobile (Flutter), mais focado em
        front-end, e agora tô estudando backend pra ir pro full-stack. Ver o
        código que eu escrevi <em>realmente</em> ajudando outras pessoas é o que
        me faz continuar a desenvolver.
      </p>

      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-2">
        {socials.map(({ key, label, href, Icon }) => (
          <li key={key} className="flex items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
            >
              <Icon className="size-4" />
              {label}
            </a>
            <span aria-hidden className="text-foreground/30 select-none">
              |
            </span>
          </li>
        ))}

        <li>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
          >
            Mais sobre mim
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </li>
      </ul>
    </section>
  );
}
