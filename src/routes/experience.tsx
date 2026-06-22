import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Briefcase, BookOpen, Rocket, Code2 } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Godidi Nande" },
      { name: "description", content: "Professional experience as a Professional Development Candidate at Capaciti GQ IT Hub, Student Developer, Academic Mentor, and Technology Enthusiast." },
    ],
  }),
  component: ExperiencePage,
});

const roles = [
  {
    icon: Code2,
    title: "Professional Development Candidate",
    period: "Capaciti GQ IT Hub",
    bullets: [
      "Developing and contributing to the full-stack architecture of the platform",
      "Designing the implementation of AI-driven ticket classification logic",
      "Supporting integration between the backend system and AI/NLP components",
      "Building and maintaining features for ticket creation, tracking, and management",
      "Collaborating with team members in an Agile-style development environment",
      "Engaging in code reviews, debugging, and system testing",
    ],
  },
  {
    icon: Briefcase,
    title: "Student Developer",
    period: "Academic & Independent Projects",
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
    bullets: [
      "Assisted students with programming concepts",
      "Supported learning in mathematics and statistics",
      "Guided peers through technical problem-solving",
    ],
  },
  {
    icon: Rocket,
    title: "Technology Enthusiast & Independent Learner",
    period: "Ongoing",
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
        <div className="grid gap-5">
          {roles.map((r) => (
            <article key={r.title} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-[auto_1fr]">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-hero text-primary-foreground shadow-elevated">
                <r.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm font-medium text-accent">{r.period}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
