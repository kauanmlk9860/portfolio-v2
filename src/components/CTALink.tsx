import Link from "next/link";
import { ChevronRightIcon } from "./icons";

/**
 * Link de ação no padrão Apple: texto no tom de destaque, chevron que
 * desliza no hover, sem sublinhado nem caixa. Aparece sempre em pares
 * ("saiba mais" + "ver código"), como os "Learn more / Buy" do site deles.
 */
export function CTALink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex items-center gap-1 text-lg text-accent transition-opacity hover:opacity-75";
  const content = (
    <>
      {children}
      <ChevronRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
