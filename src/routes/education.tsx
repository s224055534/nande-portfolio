import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { GraduationCap, Award, Users } from "lucide-react";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Achievements — Godidi Nande" },
      { name: "description", content: "Academic timeline, achievements, and leadership of Godidi Nande — IT diplomas, software development studies, and mentoring." },
      { property: "og:title", content: "Education & Achievements — Godidi Nande" },
      { property: "og:description", content: "Academic journey through IT diplomas in Software Development, achievements, and leadership experience." },
      { property: "og:url", content: "https://nande-portfolio.lovable.app/education" },
    ],
    links: [{ rel: "canonical", href: "https://nande-portfolio.lovable.app/education" }],
  }),
  component: EducationPage,
});

const entries: TimelineEntry[] = [
  {
    id: "advanced-diploma",
    icon: GraduationCap,
    eyebrow: "Higher Education",
    title: "Advanced Diploma in Information Technology",
    subtitle: "Software Development",
    date: "Feb 2025 – Dec 2025",
    description: "Advanced study in enterprise software development, system design and emerging technologies at Nelson Mandela University.",
  },
  {
    id: "diploma",
    icon: GraduationCap,
    eyebrow: "Higher Education",
    title: "Diploma in Information Technology",
    subtitle: "Software Development",
    date: "Feb 2022 – Dec 2024",
    description: "Built full-stack web applications, database-driven systems, and enterprise prototypes at Nelson Mandela University.",
  },
  {
    id: "higher-certificate",
    icon: GraduationCap,
    eyebrow: "Higher Education",
    title: "Higher Certificate in Information Technology",
    subtitle: "User Support Services",
    date: "Feb 2021 – Dec 2021",
    description: "Foundations of IT support, hardware, networks, and customer-focused problem solving at Nelson Mandela University.",
  },
  {
    id: "matric",
    icon: GraduationCap,
    eyebrow: "Secondary Education",
    title: "Matriculated — Grade 12 (Mathematics Excellence)",
    subtitle: "Port St Johns SSS",
    date: "2020",
    badge: { icon: Award, label: "3rd highest Mathematics score in Grade 12" },
    description: "Selected by educators to tutor mathematical concepts to peers.",
  },
];

const achievements = [
  "Achieved the 3rd highest Mathematics score in Grade 12",
  "Assisted fellow students with MS Office Suite, HTML, CSS, C#, and programming concepts",
  "Selected to teach and explain mathematical concepts by educators",
  "Successfully developed enterprise-level academic systems",
  "Recognized for leadership, teamwork, and mentoring abilities",
];

const leadership = [
  "Academic peer support and mentoring",
  "Team collaboration and project leadership",
  "Community learning assistance",
];

function EducationPage() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Journey</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Education & Achievements</h1>
        </div>
      </div>

      <Section eyebrow="Timeline" title="Academic Timeline">
        <Timeline entries={entries} />
      </Section>

      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Award className="h-7 w-7 text-accent" />
            <h2 className="mt-3 text-2xl font-bold text-foreground">Achievements</h2>
            <ul className="mt-3 space-y-2">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{a}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Users className="h-7 w-7 text-accent" />
            <h2 className="mt-3 text-2xl font-bold text-foreground">Leadership</h2>
            <ul className="mt-3 space-y-2">
              {leadership.map((a) => (
                <li key={a} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
