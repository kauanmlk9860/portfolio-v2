import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-11 max-w-5xl items-center justify-between px-6 text-xs">
        <Link href="#top" className="font-medium tracking-tight">
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-8 text-muted sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contato"
          className="text-muted transition-colors hover:text-foreground sm:hidden"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}
