import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Layout";
import { Mail, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Godidi Nande" },
      { name: "description", content: "Get in touch about software development, collaborations, and opportunities." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message is too short").max(1000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Let's Connect</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I am always open to discussing technology, software development opportunities, collaborations, and innovative projects. Feel free to reach out.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-8" noValidate>
            {sent && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">Message sent!</p>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="name" error={errors.name} />
              <Field label="Email Address" name="email" type="email" error={errors.email} />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" error={errors.subject} />
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea name="message" rows={6} maxLength={1000} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>

          <aside className="space-y-4">
            <InfoCard icon={Mail} label="Email" value="ppngodidi322@gmail.com" href="mailto:ppngodidi322@gmail.com" />
            <InfoCard icon={Github} label="GitHub" value="@s224055534" href="https://github.com/s224055534" />
            <InfoCard icon={Linkedin} label="LinkedIn" value="@godidi.nande" href="https://linkedin.com/in/godidi.nande" />
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated">
              <h3 className="text-lg font-semibold">Let's build something great</h3>
              <p className="mt-2 text-sm text-primary-foreground/85">Open to internships, junior roles, freelance, and collaborative projects.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input name={name} type={type} maxLength={255} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-accent">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium text-foreground">{value}</span>
      </span>
    </a>
  );
}
