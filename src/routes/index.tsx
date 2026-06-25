import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Database, Brain, Shield } from "lucide-react";
import profile from "@/assets/profile.jpg";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Godidi Nande — Full-Stack Developer & IT Professional" },
      { name: "description", content: "Aspiring Full-Stack Developer building web, database, and AI-driven enterprise systems with ASP.NET, React, and SQL Server." },
      { property: "og:title", content: "Godidi Nande — Full-Stack Developer & IT Professional" },
      { property: "og:description", content: "Portfolio of Godidi Nande — Full-Stack Developer building scalable web, database, and AI-driven enterprise systems." },
      { property: "og:url", content: "https://nande-portfolio.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://nande-portfolio.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  const { user } = useAuth();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8 lg:py-18">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground/90">
              Available for opportunities
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Godidi Nande — Full-Stack Developer
            </h1>
            <p className="mt-4 text-lg font-medium text-primary-foreground/90 sm:text-xl">
              Full-Stack Developer · Software Developer · IT Professional
            </p>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              Transforming ideas into scalable digital solutions through technology and innovation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/cv.pdf" download className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-elevated transition hover:opacity-90">
                <Download className="h-4 w-4" /> Download CV
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-white/10">
                Contact Me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="https://github.com/s224055534" target="_blank" rel="noreferrer" className="rounded-md border border-white/20 p-2.5 hover:bg-white/10" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="https://linkedin.com/in/godidi-nande" target="_blank" rel="noreferrer" className="rounded-md border border-white/20 p-2.5 hover:bg-white/10" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:ppngodidi322@gmail.com" className="rounded-md border border-white/20 p-2.5 hover:bg-white/10" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/10 shadow-elevated">
              <img src={profile} alt="Godidi Nande" className="aspect-square w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Professional Summary</p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I am an aspiring Full-Stack Developer and Software Developer with a Higher Certificate in IT (User Support),
          a Diploma in IT (Software Development), and an Advanced Diploma in IT (Software Development). My experience
          includes developing web-based business solutions, database-driven applications, and enterprise systems such
          as a Fridge Management System and Pharmacy Management System. I am passionate about software engineering,
          artificial intelligence, and building technology solutions that solve real-world problems while creating
          value for businesses and communities.
        </p>
      </section>

      {/* Highlights */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">What I Do</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Code2, title: "Full-Stack Development", body: "Designing and shipping responsive web apps with ASP.NET, React, TypeScript and modern tooling." },
              { icon: Database, title: "Enterprise Systems", body: "Built database-driven systems for inventory, pharmacy and fridge management with SQL Server." },
              { icon: Brain, title: "AI & Innovation", body: "Integrating AI/NLP into business workflows — automated ticket classification and intelligent routing." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin */}
      <div className="mx-auto max-w-7xl px-4 py-6 text-right sm:px-6 lg:px-8">
        {!user && (
          <Link to="/auth" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Shield className="h-3 w-3" /> Admin
          </Link>
        )}
      </div>
    </>
  );
}
