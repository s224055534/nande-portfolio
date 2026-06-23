import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Github, ExternalLink, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Godidi Nande" },
      { name: "description", content: "Selected full-stack and AI projects: Fridge Management, Pharmacy Management, and AI Ticket Classification." },
      { property: "og:title", content: "Selected Projects — Godidi Nande" },
      { property: "og:description", content: "Enterprise systems and AI-driven products built with ASP.NET, React, SQL Server, and modern ML tooling." },
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
          ],
        }),
      },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    title: "Fridge Management System",
    role: "Full-Stack Developer",
    overview: "A web-based system to manage customer information, inventory control, fault reporting, servicing schedules, and fridge acquisitions for beverage manufacturing companies.",
    tech: ["ASP.NET MVC Core 8", "C#", "MS SQL Server", "Entity Framework", "HTML", "CSS", "JavaScript"],
    features: ["Customer & asset registry", "Fault reporting workflow", "Servicing schedules", "Inventory tracking"],
    outcomes: ["Digitized manual processes", "Improved inventory tracking", "Streamlined maintenance scheduling", "Enhanced operational efficiency"],
  },
  {
    title: "Pharmacy Management System",
    role: "Software Developer",
    overview: "A system designed to manage pharmaceutical operations, inventory management, medicine tracking, and customer transactions.",
    tech: ["C#", "ASP.NET", "SQL Server", "HTML", "CSS", "JavaScript"],
    features: ["Medicine & stock tracking", "POS transactions", "Role-based access", "Reporting dashboards"],
    outcomes: ["Improved inventory management", "Increased operational efficiency", "Enhanced reporting capabilities"],
  },
  {
    title: "AI Ticket Classification Platform",
    role: "Full-Stack Developer / AI Integration Contributor",
    overview: "An AI-powered ticket classification system that automatically analyzes, categorizes, and routes support tickets — reducing manual sorting and accelerating resolution.",
    tech: ["React", "TypeScript", "AI APIs", "Prompt Engineering", "PostgreSQL", "Python", "ML / NLP"],
    features: ["Automated ticket categorization", "Smart routing to departments", "Status tracking (Open/In Progress/Resolved)", "Admin dashboard", "Search & filter by category, priority, status"],
    outcomes: ["Reduced manual sorting workload", "Faster response & resolution", "Higher classification accuracy", "Improved support workflows"],
  },
];

function ProjectsPage() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Portfolio</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Selected Projects</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">A snapshot of enterprise systems and AI-driven products I've designed and built.</p>
        </div>
      </div>

      <Section>
        <div className="grid gap-6">
          {projects.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="grid lg:grid-cols-[1fr_1.4fr]">
                <div className="grid aspect-video place-items-center bg-gradient-hero text-primary-foreground/70 lg:aspect-auto">
                  <div className="flex flex-col items-center gap-2 p-6 text-center">
                    <ImageIcon className="h-10 w-10" />
                    <p className="text-sm font-medium">Screenshot placeholder</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{p.role}</p>
                  <h2 className="mt-1 text-2xl font-bold text-foreground">{p.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.overview}</p>

                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technologies</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Features</h3>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {p.features.map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Outcomes</h3>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {p.outcomes.map((o) => <li key={o} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{o}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
