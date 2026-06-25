import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Briefcase, BookOpen, Rocket, Code2 } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Godidi Nande" },
      { name: "description", content: "Professional experience as a Professional Development Candidate at Capaciti GQ IT Hub, Student Developer, and Academic Mentor." },
      { property: "og:title", content: "Professional Experience — Godidi Nande" },
      { property: "og:description", content: "Roles, responsibilities, and impact across full-stack development, AI integration, and academic mentoring." },
      { property: "og:url", content: "https://nande-portfolio.lovable.app/experience" },
    ],
    links: [{ rel: "canonical", href: "https://nande-portfolio.lovable.app/experience" }],
  }),
  component: ExperiencePage,
});

const roles = [
  {
    icon: Code2,
    title: "Professional Development Candidate",
    period: "Capaciti GQ IT Hub",
    when: "Present · In progress",
    bullets: [
      "Developing and contributing to the full-stack architecture of the platform",
      "Designing the implementation of AI-driven ticket classification logic",
      "Building and maintaining features for ticket creation, tracking, and management",
      "Collaborating with team members in an Agile-style development environment",
    ],
  },
  {
    icon: Briefcase,
    title: "Student Developer",
    period: "Academic & Independent Projects",
    when: "Recent",
    bullets: [
      "Designed and developed web applications",
      "Built database-driven systems",
      "Implemented user authentication and authorization",
      "Developed responsive user interfaces",
      "Participated in software testing and debugging",
    ],
  },
  {
    icon: BookOpen,
    title: "Academic Mentor",
    period: "Peer Tutoring & Support",
    when: "Earlier",
    bullets: [
      "Assisted students with programming concepts",
      "Supported learning in mathematics and statistics",
      "Guided peers through technical problem-solving",
    ],
  },
  {
    icon: Rocket,
    title: "Technology Enthusiast & Independent Learner",
    period: "Self-directed",
    when: "Ongoing",
    bullets: [
      "Continuous learning of software development technologies",
      "Building personal projects",
      "Exploring AI and machine learning applications",
    ],
  },
];

function ExperiencePage() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Career</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Professional Experience</h1>
        </div>
      </div>

      <Section>
        <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">Timeline</h2>
        <ol className="relative ml-3 border-l-2 border-border sm:ml-4">
          {roles.map((r, i) => (
            <li key={r.title} className={`relative pl-8 sm:pl-10 ${i === roles.length - 1 ? "" : "pb-10"}`}>
              <span className="absolute -left-[13px] sm:-left-[15px] top-1 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-gradient-hero text-primary-foreground shadow-elevated ring-4 ring-background">
                <r.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <article className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{r.when}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">{r.period}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="inline-flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{b}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
