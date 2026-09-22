import { projects } from "@/data/projects";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";
import { ExternalLinkIcon, GitHubIcon } from "../icons";

export function Projects() {
  return (
    <PaperSection id="projetos" label="Projetos" note={`${projects.length} no total`}>
      <ol className="divide-y divide-rule border-y border-rule">
        {projects.map((project, index) => (
          <Reveal
            as="li"
            key={project.name}
            delay={60 * index}
            className="group grid gap-3 py-7 sm:grid-cols-[3rem_1fr]"
          >
            <span className="hand text-2xl text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="title text-2xl sm:text-3xl">
                {project.name}
                {project.featured && (
                  <span className="hand ml-3 align-middle text-lg text-ink-soft">
                    destaque
                  </span>
                )}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
                {project.description}
              </p>
              <p className="mt-3 text-xs tracking-wide text-ink-soft">
                {project.stack.join(" · ")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pen-underline flex items-center gap-1.5"
                >
                  <GitHubIcon className="size-4" />
                  Código
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="pen-underline flex items-center gap-1.5 text-accent"
                  >
                    <ExternalLinkIcon className="size-4" />
                    Ver no ar
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </PaperSection>
  );
}
