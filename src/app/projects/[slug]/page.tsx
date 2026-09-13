import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { TagChip } from "@/components/TagChip";
import { formatDate } from "@/lib/format";
import { projects } from "@/lib/projects";
import { CalendarDays, ChevronLeft, Tag } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "404",
      description: "Essa página não existe.",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="flex-1 py-8 px-0 md:px-5">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Voltar
      </Link>

      <article className="prose mx-auto my-6 max-w-prose">
        <div className="relative aspect-video overflow-hidden rounded-lg md:rounded-xl mb-8">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <header className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {project.title}
          </h1>

          <div className="flex items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <CalendarDays
                className="size-4 shrink-0 text-foreground stroke-2"
                aria-hidden
              />
              <time
                dateTime={project.createdAt}
                className="text-sm text-foreground/60"
              >
                {formatDate(project.createdAt)}
              </time>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositório do projeto ${project.title} no GitHub`}
              className="text-primary transition-opacity hover:opacity-70"
            >
              <GitHubIcon className="size-5" />
            </a>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Tag
              className="size-4 shrink-0 text-foreground stroke-2"
              aria-hidden
            />
            <ul className="flex h-5 flex-wrap gap-1.5 overflow-hidden">
              {project.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </ul>
          </div>
        </header>

        <div className="my-6 border border-surface" />

        <p className="whitespace-pre-line leading-relaxed text-foreground/80">
          {project.description}
        </p>
      </article>
    </main>
  );
}
