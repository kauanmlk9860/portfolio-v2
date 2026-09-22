import { profile } from "@/data/profile";
import { Reveal } from "../Reveal";
import { GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from "../icons";

const links = [
  { href: profile.github, label: "GitHub", icon: GitHubIcon },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: profile.instagram, label: "Instagram", icon: InstagramIcon },
  { href: `mailto:${profile.email}`, label: "E-mail", icon: MailIcon },
];

const index = [
  { href: "#sobre", label: "Sobre mim" },
  { href: "#projetos", label: "Projetos" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#certificados", label: "Certificados" },
  { href: "#faq", label: "Perguntas frequentes" },
  { href: "#contato", label: "Contato" },
];

export function Masthead() {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-16 sm:pt-24">
      <Reveal>
        <p className="hand text-2xl text-accent">Olá, eu sou o</p>
        <h1 className="title mt-1 text-5xl sm:text-7xl">{profile.name}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          {profile.role} — {profile.tagline}
        </p>
      </Reveal>

      <Reveal delay={140} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="pen-underline flex items-center gap-2 text-sm font-medium"
          >
            <Icon className="size-4" />
            {label}
          </a>
        ))}
      </Reveal>

      <Reveal delay={220} className="mt-8 flex items-center gap-3">
        {profile.available && (
          <>
            <span className="size-2 rounded-full bg-accent" />
            <span className="hand text-xl text-ink-soft">
              disponível para novas oportunidades
            </span>
          </>
        )}
      </Reveal>

      {/* Índice: com nove seções, rolar às cegas até o fim não se sustenta. */}
      <Reveal delay={280} className="mt-10 border-t border-rule pt-6">
        <p className="hand text-lg text-ink-soft">nesta página</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {index.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="pen-underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </header>
  );
}
