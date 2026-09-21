import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { CTALink } from "./CTALink";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projetos"
      title="Projetos"
      subtitle="Do app mobile à API. Cada um resolvendo um problema real."
    >
      <div className="mx-auto mt-14 grid max-w-5xl gap-4">
        {featured.map((project) => (
          <ProjectCard key={project.name} project={project} large />
        ))}
      </div>

      <div className="mx-auto mt-4 grid max-w-5xl gap-4 sm:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <CTALink href={profile.github} external>
          Ver todos no GitHub
        </CTALink>
      </div>
    </Section>
  );
}
