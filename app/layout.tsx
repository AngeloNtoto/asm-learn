import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import SearchModal from "@/components/layout/SearchModal";
import BadgeToast from "@/components/gamification/BadgeToast";
import LevelUpModal from "@/components/gamification/LevelUpModal";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "McuScript | Apprendre l'Assembleur",
  description: "Plateforme interactive d'apprentissage de l'assembleur. De la machine à la conception de compilateur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex bg-primary text-primary overflow-hidden">
        <AppShell>{children}</AppShell>
        <BadgeToast />
        <LevelUpModal />
        <SearchModal />
      </body>
    </html>
  );
}
