"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronRightIcon } from "./icons";

/**
 * Link de ação no padrão Apple: texto no tom de destaque e chevron que
 * desliza. O rótulo é magnético — puxa alguns pixels na direção do ponteiro
 * quando ele se aproxima, o que dá a sensação de que o alvo reage antes do
 * clique.
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
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const pull = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
  };

  const release = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = "";
    });
  };

  const className =
    "group relative inline-flex items-center gap-1 px-3 py-2 text-lg text-accent";
  const content = (
    <span
      ref={ref}
      className="inline-flex items-center gap-1 transition-transform duration-300 ease-out motion-reduce:transform-none!"
    >
      {children}
      <ChevronRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </span>
  );

  const props = {
    className,
    onPointerMove: pull,
    onPointerLeave: release,
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
}
