import type { Metadata } from "next";
import { Caveat, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

// Manuscrita para rótulos e anotações de margem.
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kauan Rodrigues — Desenvolvedor Full Stack",
  description:
    "Portfólio de Kauan Rodrigues, desenvolvedor full stack de Osasco (SP). Projetos em JavaScript, TypeScript, Node.js, React Native e mais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrument.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* Sem JavaScript nada disso funciona: as revelações nunca disparam,
            a fachada não tem como sair da frente e o site não é montado. */}
        <noscript>
          <style>{`
            [data-reveal]{opacity:1 !important;transform:none !important}
            [data-facade]{display:none !important}
            [data-fallback]{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip-path:none !important;white-space:normal !important}
          `}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
