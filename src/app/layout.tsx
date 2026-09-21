import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
