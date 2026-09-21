import { profile } from "@/data/profile";
import { CTALink } from "./CTALink";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section id="top" className="px-6 pt-16 pb-8 text-center sm:pt-24">
      <p className="text-lg text-accent sm:text-xl">{profile.role}</p>

      <h1 className="headline-xl mx-auto mt-3 max-w-4xl text-5xl sm:text-7xl">
        {profile.name}
      </h1>

      <p className="subhead mx-auto mt-5 max-w-2xl text-xl sm:text-2xl">
        {profile.tagline}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <CTALink href="#projetos">Ver projetos</CTALink>
        <CTALink href={profile.github} external>
          GitHub
        </CTALink>
      </div>

      <HeroVisual />
    </section>
  );
}
