import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
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
    period: "CAPACITI GQ IT Hub",
    when: "Present · In progress",
    bullets: [
      "Developing and contributing to the full-stack architecture of an AI-powered Ticket Classification Platform",
      "Designing the implementation of AI-driven ticket classification logic",
      "Building and maintaining features for ticket creation, tracking, and management",
      "Collaborating with team members in an Agile-style development environment",
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
  {
    icon: Briefcase,
    title: "Student Developer",
    period: "Nelson Mandela University",
    when: "Feb 2022 – Dec 2025",
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
    period: "Nelson Mandela University",
    when: "Apr 2023 – Dec 2024",
    bullets: [
      "Assisted students with programming concepts",
      "Supported learning in mathematics and statistics",
      "Guided peers through technical problem-solving",
    ],
  },
];

const entries: TimelineEntry[] = roles.map((r) => ({
  id: r.title,
  icon: r.icon,
  eyebrow: r.period,
  title: r.title,
  date: r.when,
  bullets: r.bullets,
}));

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
        <Timeline entries={entries} />
      </Section>
    </>
  );
}
