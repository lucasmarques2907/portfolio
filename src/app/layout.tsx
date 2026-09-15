import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DEFAULT_FLAVOR, DEFAULT_PRIMARY } from "@/lib/theme";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lucas Vinícius Marques",
    template: "%s | Lucas Vinícius Marques",
  },
  description: "...",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${jetbrainsMono.variable} ${DEFAULT_FLAVOR}`}
      data-primary={DEFAULT_PRIMARY}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background text-foreground font-mono antialiased max-w-[90%] md:max-w-[80%] mx-auto min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
