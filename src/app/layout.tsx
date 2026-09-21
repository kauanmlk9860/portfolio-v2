import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

// Inter é o equivalente livre mais próximo da SF Pro usada pela Apple.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kauan Rodrigues — Desenvolvedor Full Stack",
  description:
    "Portfólio de Kauan Rodrigues, desenvolvedor full stack de Osasco (SP). Projetos em JavaScript, TypeScript, Node.js, React Native e mais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Sem JavaScript o IntersectionObserver nunca roda, então o conteúdo
            precisa nascer visível em vez de ficar preso em opacity: 0. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
