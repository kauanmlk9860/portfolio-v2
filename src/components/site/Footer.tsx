import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 pt-8 pb-16">
      <div className="h-px w-full bg-rule" />
      <p className="mt-6 text-xs text-ink-soft">
        © {new Date().getFullYear()} {profile.name}. Desenhado em SVG e
        construído com Next.js e Tailwind CSS.
      </p>
    </footer>
  );
}
