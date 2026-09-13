import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { TagChip } from "./TagChip";
import { Tag } from "lucide-react";
import { formatDate } from "@/lib/format";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-primary/20 transition-colors hover:border-primary p-4"
    >
      <div className="relative aspect-video shrink-0 overflow-hidden mb-4 rounded-md">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 truncate text-lg font-bold text-foreground group-hover:text-primary">
            {project.title}
          </h3>
          <time
            dateTime={project.createdAt}
            className="shrink-0 text-xs text-foreground/50"
          >
            {formatDate(project.createdAt)}
          </time>
        </div>

        <p className="mt-2 line-clamp-3 text-sm text-foreground/80">
          {project.summary}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Tag
            className="size-3.5 shrink-0 text-foreground stroke-2"
            aria-hidden
          />
          <ul className="flex h-5 flex-wrap gap-1.5 overflow-hidden">
            {project.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
