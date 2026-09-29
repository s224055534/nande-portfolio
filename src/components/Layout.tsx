import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education & Achievements" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="hidden" aria-label="Home" />

          <nav className="hidden items-center justify-center gap-1 lg:flex">

            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-footer text-footer-foreground">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h3 className="font-display text-lg font-bold">Godidi Nande</h3>
            <p className="mt-2 text-sm text-footer-foreground/70">
              Full-Stack Developer · Software Developer · IT Professional
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com/s224055534" target="_blank" rel="noreferrer" className="rounded-md p-2 hover:bg-white/10" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="https://linkedin.com/in/godidi-nande" target="_blank" rel="noreferrer" className="rounded-md p-2 hover:bg-white/10" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:ppngodidi322@gmail.com" className="rounded-md p-2 hover:bg-white/10" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-footer-foreground/80">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-footer-foreground/80 hover:text-footer-foreground">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-footer-foreground/80">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-footer-foreground/80">
              <li><a href="mailto:ppngodidi322@gmail.com" className="hover:text-footer-foreground">ppngodidi322@gmail.com</a></li>
              <li><a href="https://github.com/s224055534" target="_blank" rel="noreferrer" className="hover:text-footer-foreground">github.com/s224055534</a></li>
              <li><a href="https://linkedin.com/in/godidi-nande" target="_blank" rel="noreferrer" className="hover:text-footer-foreground">linkedin.com/in/godidi-nande</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-footer-foreground/60 sm:px-6 lg:px-8">
            © 2026 Godidi Nande. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({ title, eyebrow, children, className = "" }: { title?: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${className}`}>
      {eyebrow && <p className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>}
      {title && <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>}
      {children}
    </section>
  );
}
