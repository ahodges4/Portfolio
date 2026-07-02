export type ProjectLink = {
  label: string;
  url: string;
};

export type DemoType = "live-api" | "embedded" | "static-examples" | "video" | "interactive" | "none";

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  featured: boolean;
  priority: number; // higher = shown earlier within its group (featured / non-featured)
  year: number;
  status: "Completed" | "In Progress" | "Archived";
  demoType: DemoType;
  demoUrl?: string; // internal route for "interactive", iframe src for "embedded"
  images?: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  // --- Featured ---
  {
    id: "lecture-ai",
    title: "Real-Time Lecture Transcription AI",
    shortDescription:
      "Transcribes lecture audio in real-time and generates multiple-choice questions using AI.",
    technologies: ["React", "Flask", "OpenAI API", "Python"],
    featured: true,
    priority: 100,
    year: 2023,
    status: "Completed",
    demoType: "interactive",
    demoUrl: "/projects/lecture-ai/demo",
    images: ["/images/projects/lecture-ai-1.png"],
    links: [
      { label: "GitHub", url: "https://github.com/ahodges4/Student-Engagement" },
    ],
  },

  {
    id: "ffxiv-market",
    title: "FFXIV Market Board & Crafting Analyser",
    shortDescription:
      "Discord bot tracking real-time in-game market data - pricing alerts, profit analysis, cheapest crafting-path calculation, and property availability notifications.",
    technologies: ["Python", "PostgreSQL", "WebSockets", "Universalis API", "Discord.py"],
    featured: true,
    priority: 95,
    year: 2025,
    status: "In Progress",
    demoType: "none",
    images: ["/images/projects/ffxiv-bot-1.png", "/images/projects/ffxiv-bot-2.png", "/images/projects/ffxiv-bot-3.png"],
    links: [
      { label: "GitHub", url: "https://github.com/ahodges4/FFXIV-Market-Board---Crafting-Analyser" },
    ],
  },

  {
    id: "mtg-vision",
    title: "MTG Physical-to-Digital Play Assistant",
    shortDescription:
      "Fine-tuned YOLO and CLIP models identify physical Magic: The Gathering cards via webcam, bringing them into a digital play space for remote play with real cards.",
    technologies: ["Python", "YOLO", "CLIP", "Computer Vision"],
    featured: true,
    priority: 90,
    year: 2026,
    status: "In Progress",
    demoType: "none",
    images: ["/images/projects/mtg-vision-1.png", "/images/projects/mtg-vision-2.png", "/images/projects/mtg-vision-3.png"],
    links: [
      { label: "GitHub", url: "https://github.com/ahodges4/MTG-Physical-to-Digital-Play-Assistant" },
    ],
  },

  // --- Not featured ---
  {
    id: "nhs-excel-filter",
    title: "NHS Trust Team Performance Report Filter",
    shortDescription:
      "Built for my mum, a team manager at the NHS, to automate a weekly task: given a spreadsheet covering data for the whole trust, it detects the report type, fuzzy-matches the relevant columns even if headers shift slightly between exports, filters it down to just the teams she oversees, and re-exports it with the original formatting intact.",
    technologies: ["Python", "FastAPI", "Pandas", "openpyxl", "Docker"],
    featured: false,
    priority: 70,
    year: 2025,
    status: "Completed",
    demoType: "static-examples",
    links: [

    ],
  },

  {
    id: "propmarker-floorplan",
    title: "Floorplan Analysis Feature — PropMarker",
    shortDescription:
      "Contributed to floorplan analysis and room-detection features as part of PropMarker's AI-powered property investment platform, during a Data Science / Machine Learning internship.",
    technologies: ["Python", "Computer Vision", "Machine Learning"],
    featured: false,
    priority: 60,
    year: 2025,
    status: "Completed",
    demoType: "none",
    links: [
      { label: "PropMarker", url: "https://propmarker.co.uk/" },
    ],
  },

  {
    id: "foodbank-website",
    title: "Foodbank Locator & News Platform",
    shortDescription:
      "Team project (Scrum) displaying foodbank locations on an interactive map alongside a news section for community updates.",
    technologies: ["HTML", "JavaScript", "Spring Boot", "Mapping API"],
    featured: false,
    priority: 50,
    year: 2022,
    status: "Completed",
    demoType: "none",
    links: [
      { label: "GitHub", url: "https://github.com/ahodges4/cs2001-2021_22-group25-2021" },
    ],
  },

  {
    id: "pawscout",
    title: "PawScout — Dog-at-the-Door Detector",
    shortDescription:
      "A self-hosted computer vision service that detects when my dog is waiting at the back door and, via Home Assistant, rings an indoor doorbell chime with a barking sound if he's been there for a while.",
    technologies: ["Python", "FastAPI", "YOLO", "OpenCV", "Docker", "Home Assistant"],
    featured: false,
    priority: 45,
    year: 2025,
    status: "Completed",
    demoType: "none",
    links: [
      { label: "GitHub", url: "https://github.com/ahodges4/Pawscout"}
    ],
  },

  {
    id: "homelab",
    title: "Home Lab & Smart Home Automation",
    shortDescription:
      "Self-hosted NAS (TrueNAS Scale) running containerised services — Immich, Jellyfin, Home Assistant, and more — alongside ESP32-based smart home automations and a Cloudflare Tunnel for secure remote access.",
    technologies: ["Docker", "TrueNAS Scale", "Home Assistant", "ESP32", "Cloudflare Tunnel"],
    featured: false,
    priority: 40,
    year: 2026,
    status: "Completed",
    demoType: "none",
    links: [],
  },

  {
    id: "cc-email",
    title: "ComputerCraft In-Game Email System",
    shortDescription:
      "A Lua program for Minecraft's ComputerCraft mod letting players send emails between each other via a central server computer and client terminals.",
    technologies: ["Lua", "ComputerCraft"],
    featured: false,
    priority: 20,
    year: 2026,
    status: "Completed",
    demoType: "none",
    images: ["/images/projects/cc-email-1.png", "/images/projects/cc-email-2.png"],
    links: [],
  },
];