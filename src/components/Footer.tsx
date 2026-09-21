import { profile } from "@/data/profile";

const links = [
  { href: `mailto:${profile.email}`, label: "E-mail" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.github, label: "GitHub" },
  { href: profile.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 text-xs text-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Feito com Next.js,
          Tailwind CSS e Three.js.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
