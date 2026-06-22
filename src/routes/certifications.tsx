import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Award, Eye, Download } from "lucide-react";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Godidi Nande" },
      { name: "description", content: "Technology, professional development, and bootcamp certifications." },
    ],
  }),
  component: CertificationsPage,
});

type Cert = { title: string; org: string; date: string };

const groups: { heading: string; items: Cert[] }[] = [
  {
    heading: "Technology Certifications",
    items: [
      { title: "Full-Stack Web Development", org: "Issuing Organization", date: "2025" },
      { title: "Microsoft SQL Server Fundamentals", org: "Issuing Organization", date: "2024" },
      { title: "C# / .NET Development", org: "Issuing Organization", date: "2024" },
    ],
  },
  {
    heading: "Professional Development Certificates",
    items: [
      { title: "Leadership & Mentoring", org: "Issuing Organization", date: "2024" },
      { title: "Problem Solving & Critical Thinking", org: "Issuing Organization", date: "2023" },
    ],
  },
  {
    heading: "Bootcamp Certificates",
    items: [
      { title: "AI & Prompt Engineering Bootcamp", org: "Issuing Organization", date: "2025" },
      { title: "React + TypeScript Bootcamp", org: "Issuing Organization", date: "2025" },
    ],
  },
];

function CertificationsPage() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Credentials</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Certifications</h1>
        </div>
      </div>

      {groups.map((g, gi) => (
        <Section key={g.heading} title={g.heading} className={gi === 0 ? "" : "pt-0"}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((c) => (
              <article key={c.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-hero text-primary-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">{c.date}</p>
                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border">
                  <a href="#" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                    <Eye className="h-3.5 w-3.5" /> View
                  </a>
                  <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
