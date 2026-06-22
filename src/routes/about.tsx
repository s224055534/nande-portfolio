import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Target, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Godidi Nande" },
      { name: "description", content: "My story, vision, mission, and career goals as a Full-Stack Developer." },
    ],
  }),
  component: About,
});

const goals = [
  "Become a Full-Stack Software Engineer",
  "Specialize in Artificial Intelligence and Machine Learning",
  "Build scalable enterprise applications",
  "Contribute to innovative technology projects",
  "Develop leadership skills in technology management",
];

const interests = [
  "Full-Stack Development", "Cybersecurity", "Artificial Intelligence",
  "Machine Learning", "Data Analytics", "Software Engineering",
  "Cloud Computing", "System Design", "Business Intelligence",
];

function About() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">About</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">My Story</h1>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-xl font-semibold text-foreground">Personal Background</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              I come from a rural community where opportunities were limited, but determination and education became
              the foundation of my growth. Growing up in a family that values perseverance and hard work taught me
              resilience and discipline. These experiences inspired my passion for technology and problem-solving.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-xl font-semibold text-foreground">Professional Background</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              My journey began with a strong foundation in technical support and analytical thinking. Through my
              studies and projects, I developed skills in software development, database design, web development, and
              problem-solving. I have worked on various systems that automate business processes and improve
              operational efficiency.
            </p>
          </article>
        </div>
      </Section>

      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-elevated">
            <Compass className="h-7 w-7 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">Vision</h2>
            <p className="mt-3 leading-relaxed text-primary-foreground/85">
              To become a leading technology professional who develops innovative, reliable, and secure solutions that
              positively impact businesses and communities.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <Target className="h-7 w-7 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Mission</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To continuously learn, innovate, and apply technology to solve real-world challenges while contributing
              to digital transformation and economic development.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Goals" title="Career Goals">
        <ul className="grid gap-4 sm:grid-cols-2">
          {goals.map((g, i) => (
            <li key={g} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary font-semibold text-primary">{i + 1}</span>
              <span className="text-foreground">{g}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Interests" title="Professional Interests" className="pt-0">
        <div className="flex flex-wrap gap-3">
          {interests.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-card">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> {t}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
