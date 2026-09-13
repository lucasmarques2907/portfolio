import { links, socialByKey, socials } from "@/lib/links";
import { FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Sobre mim e como entrar em contato.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 px-0 py-8 md:px-5">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Sobre</h1>

        <div className="space-y-4 leading-relaxed text-foreground/80">
          <p>
            Eae! Meu nome é Lucas Vinícius Marques, desenvolvedor de software na{" "}
            <a
              href={links.job.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Evolve Tecnologia
            </a>
            .
          </p>

          <p>
            Trabalho com desenvolvimento web (Vue e React) e mobile
            (Flutter) mais focado em front-end. Agora estou estudando pela{" "}
            <a
              href={links.bootdev.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Boot.dev
            </a>{" "}
            para ir pro full-stack, e vou aplicando o que aprendo em{" "}
            <Link href={links.projects.href} className="link">
              projetos
            </Link>{" "}
            pessoais.
          </p>

          <p>
            Fora desenvolvimento de software, eu gosto de modelagem e impressão
            3D,{" "}
            <a
              href={links.homelab.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Homelabbing
            </a>{" "}
            e de jogar com meus amigos. Fique à vontade para me{" "}
            <a
              href={socialByKey.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              mandar uma mensagem
            </a>{" "}
            se quiser bater um papo!
          </p>
        </div>

        <div className="border-t border-surface" />

        <ul className="flex flex-wrap items-center gap-3">
          {socials.map(({ label, href, Icon }, i) => (
            <li key={label} className="flex items-center gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
              >
                <Icon className="size-4" />
                {label}
              </a>

              {i < socials.length - 1 && (
                <span aria-hidden className="text-foreground/30 select-none">
                  *
                </span>
              )}
            </li>
          ))}
        </ul>

        <div>
          <a
            href={links.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <FileText className="size-4" aria-hidden />
            Currículo
          </a>
        </div>
      </div>
    </main>
  );
}
