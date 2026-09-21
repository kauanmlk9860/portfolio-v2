import type { Project } from "@/data/projects";
import { CTALink } from "./CTALink";
import { TiltCard } from "./TiltCard";

/**
 * Tile de projeto no formato dos blocos de produto da Apple: nome grande,
 * descrição curta em peso leve e um par de links de ação embaixo.
 */
export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <TiltCard className="h-full">
      <article className="flex h-full flex-col items-center overflow-hidden rounded-3xl border border-border bg-card px-8 py-12 text-center sm:px-10">
        <h3
          className={`headline ${large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}
        >
          {project.name}
        </h3>

        <p className="subhead mx-auto mt-4 max-w-md text-base sm:text-lg">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <CTALink href={project.github} external>
            Código
          </CTALink>
          {project.demo && (
            <CTALink href={project.demo} external>
              Ver demo
            </CTALink>
          )}
        </div>
      </article>
    </TiltCard>
  );
}
