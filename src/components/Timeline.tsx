import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string }>;

export type TimelineEntry = {
  id: string;
  icon?: IconType;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  date: string;
  badge?: { icon?: IconType; label: string };
  tags?: string[];
  bullets?: string[];
  description?: string;
};

const SPINE = "absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-border md:left-1/2";

const DOT =
  "absolute left-4 top-1 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated ring-4 ring-background md:left-1/2";

/**
 * Vertical timeline: a central spine with a dot per entry, a short connector
 * from the dot to the card, and cards alternating left/right of the spine.
 * Below the `md` breakpoint the spine moves to the left and every card sits
 * to its right.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      <span aria-hidden className={SPINE} />

      <ol className="space-y-8 md:space-y-10">
        {entries.map((entry, i) => {
          const onLeft = i % 2 === 0;
          const Icon = entry.icon;
          const BadgeIcon = entry.badge?.icon;

          return (
            <li key={entry.id} className="relative pl-12 md:pl-0">
              {/* connector: dot -> card */}
              <span
                aria-hidden
                className={`absolute top-[21px] h-0.5 bg-accent/40 ${
                  onLeft
                    ? "right-1/2 mr-[18px] hidden w-[30px] md:block"
                    : "left-1/2 ml-[18px] hidden w-[30px] md:block"
                }`}
              />
              <span aria-hidden className="absolute left-[34px] top-[21px] h-0.5 w-3.5 bg-accent/40 md:hidden" />

              <span className={DOT}>
                {Icon && <Icon className="h-4 w-4" />}
              </span>

              <div className="md:grid md:grid-cols-2">
                <div className={onLeft ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                  <article className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
                    {entry.eyebrow && (
                      <div className={`flex items-center gap-2 ${onLeft ? "md:justify-end" : ""}`}>
                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />}
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                          {entry.eyebrow}
                        </span>
                      </div>
                    )}

                    <h3 className="mt-2 text-lg font-semibold text-foreground">{entry.title}</h3>
                    {entry.subtitle && (
                      <p className="mt-0.5 text-sm font-medium text-muted-foreground">{entry.subtitle}</p>
                    )}
                    <p className="mt-2 text-sm font-semibold text-accent">{entry.date}</p>

                    {entry.badge && (
                      <div className={`mt-3 flex ${onLeft ? "md:justify-end" : ""}`}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
                          {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 shrink-0" />}
                          {entry.badge.label}
                        </span>
                      </div>
                    )}

                    {entry.tags && entry.tags.length > 0 && (
                      <ul className={`mt-4 flex flex-wrap gap-2 ${onLeft ? "md:justify-end" : ""}`}>
                        {entry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                    )}

                    {entry.bullets && entry.bullets.length > 0 && (
                      <ul
                        className={`mt-4 space-y-2.5 border-accent/30 border-l-2 pl-4 ${
                          onLeft ? "md:border-l-0 md:border-r-2 md:pl-0 md:pr-4" : ""
                        }`}
                      >
                        {entry.bullets.map((b, idx) => (
                          <li
                            key={b}
                            className={`flex gap-3 text-sm leading-relaxed text-muted-foreground ${
                              onLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-accent/80">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
