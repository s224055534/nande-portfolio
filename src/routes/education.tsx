import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { GraduationCap, Award, Users } from "lucide-react";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Achievements — Godidi Nande" },
      { name: "description", content: "Academic timeline, achievements and leadership of Godidi Nande." },
    ],
  }),
  component: EducationPage,
});

const timeline = [
  { year: "Feb 2025 – Dec 2025", title: "Advanced Diploma in Information Technology", subtitle: "Software Development", desc: "Advanced study in enterprise software development, system design and emerging technologies." },
  { year: "Feb 2022 – Dec 2024", title: "Diploma in Information Technology", subtitle: "Software Development", desc: "Built full-stack web applications, database-driven systems, and enterprise prototypes." },
  { year: "Feb 2021 – Dec 2021", title: "Higher Certificate in Information Technology", subtitle: "User Support Services", desc: "Foundations of IT support, hardware, networks, and customer-focused problem solving." },
  { year: "2020", title: "Matriculated — Grade 12 (Mathematics Excellence)", subtitle: "Achieved the 3rd highest Mathematics score in Grade 12", desc: "Selected by educators to tutor mathematical concepts to peers." },
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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Journey</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Education & Achievements</h1>
        </div>
      </div>

      <Section eyebrow="Timeline" title="Academic Timeline">
        <ol className="relative space-y-8 border-l-2 border-border pl-8 sm:pl-10">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[42px] grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated sm:-left-[50px]">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{t.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{t.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <Award className="h-7 w-7 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Achievements</h2>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{a}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <Users className="h-7 w-7 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Leadership</h2>
            <ul className="mt-4 space-y-3">
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
