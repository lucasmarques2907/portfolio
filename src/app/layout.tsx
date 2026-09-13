import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Placeholder title",
  description: "Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-mono antialiased max-w-[90%] md:max-w-[80%] mx-auto min-h-screen flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
