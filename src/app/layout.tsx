import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.title}`,
  description:
    "Cybersecurity Analyst with operational experience in SIEM monitoring, DDoS mitigation, and incident triage. EC-Council CCT | ISC2 CC | Fortinet FCA.",
  metadataBase: new URL("https://darrshan23.github.io"),
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description:
      "Cybersecurity Analyst with operational experience in SIEM monitoring, DDoS mitigation, and incident triage.",
    images: [profile.photo],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="relative overflow-x-hidden bg-bg font-sans text-ink-1">
        <Preloader />
        <ScrollProgress />
        <NoiseOverlay />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
