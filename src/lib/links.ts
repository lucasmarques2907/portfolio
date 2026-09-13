import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { ComponentType, SVGProps } from "react";

export type Link = {
  href: string;
};

export type SocialLink = Link & {
  key: "github" | "linkedin";
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const links = {
  job: {
    href: "https://evolvecap.com.br/",
  },
  bootdev: {
    href: "https://boot.dev/u/lcsvmrqs",
  },
  projects: {
    href: "/projects",
  },
  homelab: {
    href: "https://prohomelab.com/en/posts/homelabbing/",
  },
  resume: {
    href: "/curriculo.pdf",
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
  socials.map((s) => [s.key, s])
) as Record<SocialLink["key"], SocialLink>;