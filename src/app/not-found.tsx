import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-5xl font-bold text-primary md:text-6xl">404</p>

        <p className="mt-4 text-foreground/80">Essa página não existe.</p>

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          Voltar pro início
        </Link>
      </div>
    </main>
  );
}
