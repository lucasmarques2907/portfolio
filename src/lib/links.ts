import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { ComponentType, SVGProps } from "react";

export type Link = {
  href: string;
  label: string;
};

export type SocialLink = Link & {
  key: "github" | "linkedin";
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const links = {
  job: {
    href: "https://evolvecap.com.br/",
    label: "Evolve Tecnologia",
  },
  bootdev: {
    href: "https://boot.dev/u/lcsvmrqs",
    label: "Boot.dev",
  },
  projects: {
    href: "/projects",
    label: "Projetos",
  },
  homelab: {
    href: "https://prohomelab.com/en/posts/homelabbing/",
    label: "Homelab",
  },
  resume: {
    href: "/curriculo.pdf",
    label: "Currículo",
  },
} satisfies Record<string, Link>;

export const socials: SocialLink[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/lucasmarques2907",
    Icon: GitHubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/lcsvmrqs/",
    Icon: LinkedInIcon,
  },
];

export const socialByKey = Object.fromEntries(
  socials.map((s) => [s.key, s]),
) as Record<SocialLink["key"], SocialLink>;

export const navLinks = [
  { label: "Sobre", href: "/about" },
  { label: "Projetos", href: "/projects" },
] satisfies Link[];

export const navSecondary = [
  { label: "Currículo", href: "/curriculo.pdf", external: true },
];
