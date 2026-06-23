import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Layout";

const URL = "https://nande-portfolio.lovable.app/blog/software-developer-portfolio-guide";
const TITLE = "How to Create a Software Developer Portfolio (with ASP.NET & React Examples)";
const DESCRIPTION =
  "A practical guide to building a software developer portfolio. Real examples of enterprise systems and full-stack projects built with ASP.NET and React, plus portfolio website examples that get noticed by recruiters.";

export const Route = createFileRoute("/blog/software-developer-portfolio-guide")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Godidi Nande` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Person", name: "Godidi Nande" },
          mainEntityOfPage: URL,
        }),
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Guide</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{TITLE}</h1>
          <p className="mt-4 text-muted-foreground">
            What makes a software developer portfolio worth a recruiter's time — and how I structured mine using ASP.NET and React projects.
          </p>
        </div>
      </div>

      <Section>
        <article className="mx-auto max-w-3xl space-y-6 text-foreground leading-relaxed">
          <h2 className="text-2xl font-bold">Why a portfolio matters</h2>
          <p className="text-muted-foreground">
            A portfolio is the fastest way to prove what a CV only claims. For an aspiring full-stack developer, it's the difference between "I know ASP.NET and React" and "here is a Fridge Management System I shipped end-to-end with ASP.NET MVC Core 8, SQL Server, and Entity Framework."
          </p>

          <h2 className="text-2xl font-bold">What recruiters actually look for</h2>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li>Real projects with real problems solved, not tutorials.</li>
            <li>A clear stack on each project — language, framework, database.</li>
            <li>Measurable outcomes ("digitised manual processes", "reduced ticket triage time").</li>
            <li>Source code on GitHub and, where possible, a live demo.</li>
            <li>Concise writing and a clean, professional layout.</li>
          </ul>

          <h2 className="text-2xl font-bold">Portfolio website examples that work</h2>
          <p className="text-muted-foreground">
            Strong portfolios share the same structure: a home page with a one-line value proposition, an experience page, a projects page where each project has overview / tech / features / outcomes, and a contact page. Avoid carousels, heavy animations, and stock illustrations — they slow the page and dilute the work.
          </p>

          <h2 className="text-2xl font-bold">Picking projects to feature</h2>
          <p className="text-muted-foreground">
            Pick three projects that together demonstrate breadth: one enterprise full-stack system, one database-heavy domain app, and one project that integrates something modern (AI, real-time, payments). On this site I feature:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li><strong>Fridge Management System</strong> — ASP.NET MVC Core 8, C#, SQL Server, Entity Framework.</li>
            <li><strong>Pharmacy Management System</strong> — C#, ASP.NET, SQL Server.</li>
            <li><strong>AI Ticket Classification Platform</strong> — React, TypeScript, Python, NLP / ML APIs.</li>
          </ul>

          <h2 className="text-2xl font-bold">How to structure each project page</h2>
          <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
            <li><strong>Overview</strong> — one paragraph: what it does and who it's for.</li>
            <li><strong>Technologies</strong> — the actual stack, no buzzwords.</li>
            <li><strong>Key features</strong> — three to five bullets a non-technical reader can follow.</li>
            <li><strong>Outcomes</strong> — what improved as a result.</li>
            <li><strong>Links</strong> — GitHub repo and a live demo when possible.</li>
          </ol>

          <h2 className="text-2xl font-bold">Tech stack for the portfolio itself</h2>
          <p className="text-muted-foreground">
            This portfolio is built with React and TypeScript on TanStack Start, with Tailwind CSS for styling. It uses server functions for backend work and Supabase for storing credentials data. The same stack is great for any developer portfolio: fast, statically renderable, easy to deploy, and easy to extend with a blog or admin area.
          </p>

          <h2 className="text-2xl font-bold">Common mistakes to avoid</h2>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li>Listing every tutorial you've ever followed.</li>
            <li>No description of what the project does — only a screenshot.</li>
            <li>Broken GitHub links or empty repositories.</li>
            <li>Hiding contact details behind a form that doesn't say where messages go.</li>
          </ul>

          <h2 className="text-2xl font-bold">Next steps</h2>
          <p className="text-muted-foreground">
            Browse the live <Link to="/projects" className="font-medium text-primary underline-offset-4 hover:underline">Projects</Link> page to see how each section is laid out, or read more <Link to="/about" className="font-medium text-primary underline-offset-4 hover:underline">about my background</Link>.
          </p>
        </article>
      </Section>
    </>
  );
}
