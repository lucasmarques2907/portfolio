import { experiences } from "@/lib/experience";
import { ExperienceItem } from "../ExperienceItem";

export default function Experiences() {
  return (
    <section className="px-4 md:px-0">
      <div className="flex flex-wrap gap-2">
        {experiences.map((experience) => (
          <ExperienceItem key={experience.key} experience={experience} />
        ))}
      </div>
    </section>
  );
}
