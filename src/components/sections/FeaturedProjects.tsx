import { featuredProjects } from "@/lib/projects";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "../ProjectCard";

export default function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <section className="px-4 md:px-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
          <Star className="size-6 shrink-0 text-primary" aria-hidden />
          Projetos em Destaque
        </h2>

        <Link
          href="/projects"
          className="link group hidden sm:inline-flex shrink-0 items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-primary"
        >
          Ver todos
          <ArrowRight
            href="/projects"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
