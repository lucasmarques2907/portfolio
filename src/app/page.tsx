import Dashboard from "@/components/sections/Dashboard";
import Experiences from "@/components/sections/Experiences";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
        <Hero />
        <Experiences />
        <FeaturedProjects />
        <Dashboard />
      </div>
    </main>
  );
}
