import { useEffect, useState } from "react";
import { Award } from "lucide-react";

type Suggestion = { name: string; domain: string; logo: string };

const cache = new Map<string, string | null>();

export function OrgLogo({ organization, size = 44 }: { organization: string; size?: number }) {
  const key = organization.trim().toLowerCase();
  const [logo, setLogo] = useState<string | null>(() => cache.get(key) ?? null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (cache.has(key)) {
      setLogo(cache.get(key) ?? null);
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(organization)}`,
        );
        if (!res.ok) throw new Error("lookup failed");
        const data = (await res.json()) as Suggestion[];
        const url = data?.[0]?.logo ?? null;
        cache.set(key, url);
        if (!cancelled) setLogo(url);
      } catch {
        cache.set(key, null);
        if (!cancelled) setLogo(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key, organization]);

  const showFallback = !logo || failed;

  return (
    <div
      className="grid place-items-center rounded-lg overflow-hidden bg-gradient-hero text-primary-foreground shrink-0"
      style={{ width: size, height: size }}
    >
      {showFallback ? (
        <Award className="h-5 w-5" />
      ) : (
        <img
          src={logo!}
          alt={`${organization} logo`}
          className="h-full w-full object-contain bg-white p-1"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
