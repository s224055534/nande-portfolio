import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Layers,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import fridgeImg from "@/assets/fridge.png.asset.json";
import pharmacyImg from "@/assets/pharmacy.png.asset.json";
import aiImg from "@/assets/ai-ticket.png.asset.json";
import tourImg from "@/assets/tour-guide.png";
import ePlantImg from "@/assets/e-plant.png";
import clinicImg from "@/assets/clinicflow.png";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Godidi Nande" },
      { name: "description", content: "Selected full-stack, front-end and AI projects: Fridge Management, Pharmacy Management, AI Ticket Classification, Tour Guide App, e-Plant Shopping System, and ClinicFlow Dashboard." },
      { property: "og:title", content: "Selected Projects — Godidi Nande" },
      { property: "og:description", content: "Enterprise systems, AI-driven products, and web apps built with ASP.NET, React, SQL Server, and modern ML tooling." },
      { property: "og:url", content: "https://nande-portfolio.lovable.app/projects" },
    ],
    links: [{ rel: "canonical", href: "https://nande-portfolio.lovable.app/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "SoftwareApplication", name: "Fridge Management System", applicationCategory: "BusinessApplication", description: "Web-based system to manage customers, inventory, fault reporting, and servicing schedules for beverage manufacturers.", author: { "@type": "Person", name: "Godidi Nande" } },
            { "@type": "SoftwareApplication", name: "Pharmacy Management System", applicationCategory: "BusinessApplication", description: "System to manage pharmaceutical operations, inventory, medicine tracking, and customer transactions.", author: { "@type": "Person", name: "Godidi Nande" } },
            { "@type": "SoftwareApplication", name: "AI Ticket Classification Platform", applicationCategory: "BusinessApplication", description: "AI-powered ticket classification system that analyzes, categorizes, and routes support tickets automatically.", author: { "@type": "Person", name: "Godidi Nande" } },
            { "@type": "WebApplication", name: "Tour Guide App", applicationCategory: "TravelApplication", description: "Travel guide web application that lets users discover destinations, browse curated tours, and explore tour locations.", author: { "@type": "Person", name: "Godidi Nande" } },
            { "@type": "WebApplication", name: "e-Plant Shopping System", applicationCategory: "ECommerceApplication", description: "E-commerce shopping system for plants with product browsing, category filtering, and cart management.", author: { "@type": "Person", name: "Godidi Nande" } },
            { "@type": "WebApplication", name: "ClinicFlow Dashboard", applicationCategory: "BusinessApplication", description: "Clinic management dashboard that streamlines appointments, patient records, and reporting.", author: { "@type": "Person", name: "Godidi Nande" } },
          ],
        }),
      },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  title: string;
  role: string;
  image: string;
  overview: string;
  tech: string[];
  features: string[];
  outcomes: string[];
  liveUrl: string | null;
  githubUrl: string | null;
};

const allProjects: Project[] = [
  {
    title: "Fridge Management System",
    role: "Full-Stack Developer",
    image: fridgeImg.url,
    overview: "A web-based system to manage customer information, inventory control, fault reporting, servicing schedules, and fridge acquisitions for beverage manufacturing companies.",
    tech: ["ASP.NET MVC Core 8", "C#", "MS SQL Server", "Entity Framework", "HTML", "CSS", "JavaScript"],
    features: ["Customer & asset registry", "Fault reporting workflow", "Servicing schedules", "Inventory tracking"],
    outcomes: ["Digitized manual processes", "Improved inventory tracking", "Streamlined maintenance scheduling", "Enhanced operational efficiency"],
    liveUrl: null,
    githubUrl: "https://github.com/s224055534/FM.WebSite",
  },
  {
    title: "Pharmacy Management System",
    role: "Full-Stack Developer",
    image: pharmacyImg.url,
    overview: "A system designed to manage pharmaceutical operations, inventory management, medicine tracking, and customer transactions.",
    tech: ["C#", "ASP.NET", "SQL Server", "HTML", "CSS", "JavaScript"],
    features: ["Medicine & stock tracking", "POS transactions", "Role-based access", "Reporting dashboards"],
    outcomes: ["Improved inventory management", "Increased operational efficiency", "Enhanced reporting capabilities"],
    liveUrl: null,
    githubUrl: "https://github.com/s224055534/PharmacyApp",
  },
  {
    title: "AI Ticket Classification Platform",
    role: "Full-Stack Developer / AI Integration Contributor",
    image: aiImg.url,
    overview: "An AI-powered ticket classification system that automatically analyzes, categorizes, and routes support tickets — reducing manual sorting and accelerating resolution.",
    tech: ["React", "TypeScript", "AI APIs", "Prompt Engineering", "PostgreSQL", "Python", "ML / NLP"],
    features: ["Automated ticket categorization", "Smart routing to departments", "Status tracking (Open/In Progress/Resolved)", "Admin dashboard", "Search & filter by category, priority, status"],
    outcomes: ["Reduced manual sorting workload", "Faster response & resolution", "Higher classification accuracy", "Improved support workflows"],
    liveUrl: "https://persona-powered-biz.lovable.app",
    githubUrl: "https://github.com/s224055534/nande-portfolio",
  },
  {
    title: "Tour Guide App",
    role: "Front-End Developer",
    image: tourImg,
    overview: "A travel guide web application that lets users discover destinations, browse curated tours, and explore tour locations through a clean, responsive interface.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    features: ["Destination browsing", "Curated tour listings", "Search & filtering", "Mobile-friendly layout"],
    outcomes: ["Practiced semantic HTML & modern CSS", "Built an intuitive travel browsing experience", "Improved front-end fundamentals"],
    liveUrl: "https://tourist-guide-s2vt.onrender.com",
    githubUrl: null,
  },
  {
    title: "e-Plant Shopping System",
    role: "Full-Stack Developer",
    image: ePlantImg,
    overview: "An e-commerce shopping system for plants, with product browsing, category filtering, cart management, and a smooth checkout flow.",
    tech: ["React", "Vite", "JavaScript", "CSS"],
    features: ["Product catalog & categories", "Shopping cart management", "Add-to-cart workflow", "Responsive product grid"],
    outcomes: ["Strengthened React & component design skills", "Delivered a complete shopping experience", "Applied responsive e-commerce UI patterns"],
    liveUrl: "https://s224055534.github.io/e-plantShopping",
    githubUrl: "https://github.com/s224055534/e-plantShopping",
  },
  {
    title: "ClinicFlow Dashboard",
    role: "Full-Stack Developer",
    image: clinicImg,
    overview: "A clinic management dashboard that streamlines appointments, patient records, and reporting — giving staff a clear, real-time overview of clinic operations.",
    tech: ["React", "TypeScript", "REST APIs", "Data Visualization"],
    features: ["Appointment scheduling & calendar", "Patient records management", "Analytics & reporting views", "Role-based dashboards"],
    outcomes: ["Simplified clinic workflow management", "Improved visibility of patient data", "Reduced manual scheduling overhead"],
    liveUrl: "https://clinic-flow-1.onrender.com",
    githubUrl: null,
  },
];

// Cards are listed in ascending alphabetical order by title (A → Z).
const projects = [...allProjects].sort((a, b) =>
  a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true }),
);

function TechChips({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <span
          key={t}
          className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
        >
          {t}
        </span>
      ))}
      {rest > 0 && (
        <span className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          +{rest}
        </span>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View details for ${project.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted/70">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-primary-foreground shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-primary/95 to-primary/70 py-2.5 text-xs font-semibold text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
          View project details
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {project.role}
        </p>
        <h2 className="mt-1.5 text-lg font-bold leading-snug text-foreground">
          {project.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.overview}
        </p>

        <div className="mt-4 flex-1" />
        <TechChips items={project.tech} limit={3} />

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                <ExternalLink className="h-3.5 w-3.5" /> Demo
              </span>
            )}
            {project.githubUrl && <Github className="h-4 w-4" />}
          </span>
        </div>
      </div>
    </button>
  );
}

function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
        {project && (
          <>
            <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left sm:px-7 sm:py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {project.role}
              </p>
              <DialogTitle className="mt-1 text-xl font-bold sm:text-2xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {project.overview}
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[calc(92vh-6.5rem)] overflow-y-auto">
              <div className="grid lg:grid-cols-[1.1fr_1fr]">
                {/* Full screenshot */}
                <div className="border-b border-border bg-muted/60 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                  <img
                    src={project.image}
                    alt={`${project.title} full preview`}
                    className="mx-auto h-auto max-h-[42vh] w-full object-contain lg:max-h-[62vh]"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6 p-5 sm:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.overview}
                  </p>

                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <Layers className="h-3.5 w-3.5 text-accent" /> Tech Stack
                    </h3>
                    <div className="mt-2.5">
                      <TechChips items={project.tech} />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent" /> Key Features
                      </h3>
                      <ul className="mt-2.5 space-y-2">
                        {project.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm leading-snug text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        <TrendingUp className="h-3.5 w-3.5 text-accent" /> Outcomes
                      </h3>
                      <ul className="mt-2.5 space-y-2">
                        {project.outcomes.map((o) => (
                          <li key={o} className="flex gap-2 text-sm leading-snug text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-auto flex flex-wrap gap-3 border-t border-border pt-5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                        >
                          <Github className="h-4 w-4" /> GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : projects[activeIndex];

  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Portfolio</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Selected Projects</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">A snapshot of enterprise systems, AI-driven products, and web applications I've designed and built.</p>
        </div>
      </div>

      <Section>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpen={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </Section>

      <ProjectDialog
        project={active}
        open={activeIndex !== null}
        onOpenChange={(next) => {
          if (!next) setActiveIndex(null);
        }}
      />
    </>
  );
}
