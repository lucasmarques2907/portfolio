export type Experience = {
  key: string;
  name: string;
  role: string;
  description: string;
  period: string;
  href: string;
  logo: string;
};

export const experiences: Experience[] = [
  {
    key: "evolve",
    name: "Evolve Tecnologia",
    role: "Desenvolvedor de Software",
    description:
      "Desenvolvimento web e mobile, com foco em front-end usando Vue, React e Flutter.",
    period: "Maio 2024 - Presente",
    href: "https://evolvecap.com.br",
    logo: "/experiences/evolve.svg",
  },
];
