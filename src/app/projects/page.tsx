import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { Folders } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="flex-1 pt-8 px-0 md:px-5">
      <div className="flex items-center gap-3 text-3xl font-bold mb-8">
        <Folders className="text-primary" />
        <h1 className=" text-foreground">Projetos</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 3} />
        ))}
      </div>
    </main>
  );
}
