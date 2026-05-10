import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const bodyFont = Rajdhani({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const displayFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"]
});

export const metadata: Metadata = {
  title: "izen.lol style utility platform",
  description: "Soft-light utility product shell with supported services, bot onboarding, pricing, and status pages."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} dark`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
