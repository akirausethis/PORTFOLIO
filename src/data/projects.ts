export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  year: string;
  role: string;
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    apis?: string[];
  };
  images: string[];
  problem: string;
  solution: string;
  architecture?: string;
  features: string[];
  challenges: string;
  results: string;
  insights: string;
  links: {
    github?: string;
    demo?: string;
  };
};

export const projectsData: Project[] = [
  {
    slug: "lumora",
    title: "LUMORA",
    category: "Freelance & E-Commerce",
    shortDescription: "A creative e-commerce platform connecting professional creators with clients, offering high-quality design services.",
    year: "2025",
    role: "Web Developer",
    technologies: {
      frontend: ["Next.js", "Tailwind CSS"],
      backend: ["TypeScript"],
      database: ["Firebase"],
    },
    images: ["/projects/lumora.jpg"],
    problem: "Creative students lacked a centralized platform to showcase and sell their work, leading to scattered portfolios and missed opportunities for collaboration.",
    solution: "Developed LUMORA, combining a standard marketplace with a 'Creator Feed' to help creatives build a community and sell their assets.",
    architecture: "Built as a robust frontend application utilizing Next.js App Router and Tailwind CSS, preparing for scalable cloud backend integration.",
    features: [
      "Product catalogs and shopping cart functionality",
      "Creator Feed for sharing work-in-progress",
      "Responsive design for mobile and desktop",
      "Optimized image loading and performance"
    ],
    challenges: "Designing a UI that feels premium and doesn't distract from the users' artwork, while ensuring the underlying state management remained predictable.",
    results: "Successfully built and validated the core MVP flow, establishing a clear roadmap for backend integration.",
    insights: "Learned the importance of decoupling state logic from UI components early on to prepare for future backend integration.",
    links: {
      github: "https://github.com/akirausethis/LUMORA?utm_source=chatgpt.com"
    }
  },
  {
    slug: "aero",
    title: "AERO",
    category: "AI Travel Planner",
    shortDescription: "An AI-powered travel planning and smart budget management platform that crafts hyper-personalized itineraries.",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: {
      frontend: ["React", "Tailwind CSS"],
      backend: ["Node.js"],
      apis: ["OpenAI", "Maps API"],
    },
    images: ["/projects/aero.jpg"],
    problem: "Planning trips is often tedious, requiring users to juggle multiple tabs for routing, budgeting, and itinerary creation.",
    solution: "Created AERO to connect users with an autonomous travel agent that uses real-world intelligence to craft seamless travel plans.",
    architecture: "A highly interactive client architecture that dynamically generates maps and routes based on AI-streamed JSON data.",
    features: [
      "AI-generated personalized itineraries",
      "Smart budget tracking and cost estimation",
      "Interactive routing and maps",
      "Automated smart reminders"
    ],
    challenges: "Ensuring the AI consistently generated reliable, geographically accurate routing data that could be parsed into an interactive UI.",
    results: "Delivered a beautiful, dark-mode focused application that drastically reduces travel planning time.",
    insights: "Streaming AI responses directly into structured UI components provides a magical user experience when handled robustly.",
    links: {
      github: "https://github.com/akirausethis/AERO?utm_source=chatgpt.com"
    }
  },
  {
    slug: "chesma",
    title: "CHESMA",
    category: "Smart Kitchen Platform",
    shortDescription: "An AI cooking assistant that helps users manage food inventory, find recipes, and reduce household food waste.",
    year: "2026",
    role: "Web Developer",
    technologies: {
      frontend: ["React", "Vite", "Tailwind CSS"],
      backend: ["TypeScript"],
      apis: ["Google Gemini API"],
    },
    images: ["/projects/chesma.jpg"],
    problem: "Households frequently waste food due to poor inventory tracking and a lack of ideas on how to combine available ingredients.",
    solution: "Created an application that tracks available pantry items and uses AI to generate personalized meal plans based strictly on stock.",
    architecture: "A fast, client-side Vite/React application that securely interfaces with the Google Gemini API for intelligent data processing.",
    features: [
      "Dynamic food inventory tracking",
      "AI-powered personalized recipe generation",
      "Interactive step-by-step cooking guides",
      "Fast, lightweight client architecture"
    ],
    challenges: "Prompt engineering the LLM to consistently return structured, safe, and actually edible recipes based on random combinations.",
    results: "Successfully integrated LLM capabilities into a practical, everyday utility application.",
    insights: "AI APIs are incredibly powerful for feature generation, but require strict guardrails and fallback UI states to handle unpredictability.",
    links: {
      github: "https://github.com/akirausethis/CHESMA?utm_source=chatgpt.com"
    }
  },
  {
    slug: "billo",
    title: "BILLO",
    category: "Financial Management",
    shortDescription: "A modern invoicing and financial management platform for creators and small businesses to track cash flow.",
    year: "2026",
    role: "Frontend Engineer",
    technologies: {
      frontend: ["Next.js", "Tailwind CSS"],
      backend: ["TypeScript", "Node.js"],
      database: ["PostgreSQL"],
    },
    images: ["/projects/billo.jpg"],
    problem: "Freelancers and small creators often struggle with tracking invoices and managing recurring payments in a unified dashboard.",
    solution: "Built a financial command center to track upcoming bills, manage client invoices, and visualize cashflow effortlessly.",
    architecture: "A dashboard-heavy application requiring complex state management, data visualization, and secure authentication.",
    features: [
      "Professional invoice generation",
      "Recurring bill tracking and reminders",
      "Client management database",
      "Financial insight reporting"
    ],
    challenges: "Handling complex date math and state updates for recurring billing cycles without causing UI layout shifts.",
    results: "Created a highly professional, trustworthy interface that makes financial management feel less overwhelming.",
    insights: "In financial apps, data density must be carefully balanced with whitespace to prevent user cognitive overload.",
    links: {
      github: "https://github.com/akirausethis/BILLO?utm_source=chatgpt.com"
    }
  },
  {
    slug: "enteam",
    title: "ENTEAM",
    category: "Team Collaboration",
    shortDescription: "A centralized task management workspace designed to streamline team collaboration with smart contextual tools.",
    year: "2026",
    role: "Web Developer",
    technologies: {
      frontend: ["Next.js", "Tailwind CSS"],
      backend: ["TypeScript"],
    },
    images: ["/projects/enteam.jpg"],
    problem: "Teams often struggle with disjointed workflows because communication happens in one app while task management happens in another.",
    solution: "Developed a centralized workspace where users can organize tasks, monitor progress, and collaborate effectively in context.",
    architecture: "Next.js App Router application focused on component reusability, responsive design, and maintainable state architecture.",
    features: [
      "Contextual task management",
      "Progress monitoring dashboards",
      "Responsive workspace layouts",
      "Reusable UI component system"
    ],
    challenges: "Designing an interface that handles high information density without feeling cluttered or overwhelming to the user.",
    results: "Built a robust, maintainable codebase that successfully demonstrates complex state management in a modern React app.",
    insights: "Investing heavily in a strict component system early on pays massive dividends when scaling complex workspace interfaces.",
    links: {
      github: "https://github.com/akirausethis/ENTEAM?utm_source=chatgpt.com"
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}
