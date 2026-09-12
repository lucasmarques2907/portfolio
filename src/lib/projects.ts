export type Project = {
  slug: string;
  title: string;
  createdAt: string;
  github: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  description: string;
  isFeatured: boolean;
};

export const projects: Project[] = [
  {
    slug: "cep-fetcher",
    title: "CEP Fetcher",
    createdAt: "2025-06-25",
    github: "https://github.com/lucasmarques2907/cep_fetcher",
    tags: ["dart", "flutter", "github-actions"],
    image: {
      src: "/projects/cep-fetcher.png",
      alt: "flutter image",
    },
    description: "Placeholder",
    isFeatured: false,
  },
  {
    slug: "gpu-price-scraper",
    title: "GPU Price Scraper",
    createdAt: "2026-08-28",
    github: "https://github.com/lucasmarques2907/gpu-price-scraper",
    tags: ["python", "cli"],
    image: {
      src: "/projects/gpu-price-scraper.jpg",
      alt: "gpu image",
    },
    description: "Placeholder",
    isFeatured: false,
  },
  {
    slug: "library-manager",
    title: "Library Manager",
    createdAt: "2026-07-05",
    github: "https://github.com/lucasmarques2907/library_manager",
    tags: ["react", "typescript", "tailwindcss"],
    image: {
      src: "/projects/library-manager.jpeg",
      alt: "library",
    },
    description: "Placeholder",
    isFeatured: false,
  },
];
