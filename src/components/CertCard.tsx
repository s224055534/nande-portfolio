import { useEffect, useState } from "react";
import { Eye, ExternalLink, FileText, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getCertificateSignedUrl } from "@/lib/certificate-signed-url.functions";
import { OrgLogo } from "@/components/OrgLogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export type Cert = {
  id: string;
  title: string;
  organization: string;
  date_issued: string;
  description: string | null;
  file_url: string | null;
  link_url: string | null;
};

const previewCache = new Map<string, { url: string; isPdf: boolean }>();

export function CertCard({
  cert,
  isAdmin,
  onEdit,
  onDelete,
}: {
  cert: Cert;
  isAdmin: boolean;
  onEdit: (c: Cert) => void;
  onDelete: (c: Cert) => void;
}) {
  const [preview, setPreview] = useState<{ url: string; isPdf: boolean } | null>(
    () => (cert.file_url ? previewCache.get(cert.file_url) ?? null : null),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const fetchSignedUrl = useServerFn(getCertificateSignedUrl);

  useEffect(() => {
    let cancelled = false;
    if (!cert.file_url) return;
    if (previewCache.has(cert.file_url)) {
      setPreview(previewCache.get(cert.file_url)!);
      return;
    }
    (async () => {
      try {
        const result = await fetchSignedUrl({ data: { path: cert.file_url! } });
        if (cancelled) return;
        const isPdf = cert.file_url!.toLowerCase().endsWith(".pdf");
        const value = { url: result.url, isPdf };
        previewCache.set(cert.file_url!, value);
        setPreview(value);
      } catch {
        if (!cancelled) setPreview(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cert.file_url, fetchSignedUrl]);


  const fileName = cert.file_url?.split("/").pop() ?? null;
  const monthYear = new Date(cert.date_issued).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated">
        {/* Thumbnail */}
        <button
          type="button"
          onClick={() => preview && setModalOpen(true)}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-gradient-subtle"
          aria-label={preview ? "Open certificate preview" : "No preview available"}
        >
          {preview && !preview.isPdf ? (
            <img
              src={preview.url}
              alt={`${cert.title} certificate preview`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : preview && preview.isPdf ? (
            <object
              data={`${preview.url}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              className="pointer-events-none h-full w-full"
              aria-label={`${cert.title} PDF preview`}
            >
              <div className="grid h-full w-full place-items-center text-muted-foreground">
                <FileText className="h-10 w-10" />
              </div>
            </object>
          ) : (
            <div className="grid h-full w-full place-items-center text-muted-foreground">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
          {preview && (
            <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Eye className="h-3 w-3" /> Preview
            </span>
          )}
        </button>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start gap-3">
            <OrgLogo organization={cert.organization} size={40} />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold leading-snug text-foreground">
                {cert.title}
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {cert.organization}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Issued {monthYear}</p>
            </div>
          </div>

          {cert.description && (
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {cert.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            {preview && (
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Eye className="h-3.5 w-3.5" /> View credential
              </button>
            )}
            {cert.link_url && (
              <a
                href={cert.link_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Link
              </a>
            )}
            {isAdmin && (
              <>
                <button
                  onClick={() => onEdit(cert)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => onDelete(cert)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-background px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </>
            )}
          </div>

          {fileName && (
            <p className="mt-3 truncate text-[11px] text-muted-foreground" title={fileName}>
              <FileText className="mr-1 inline h-3 w-3" />
              {fileName}
            </p>
          )}
        </div>
      </article>

      {/* Modal preview */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-4">
            <DialogTitle className="text-base">{cert.title}</DialogTitle>
          </DialogHeader>
          <div className="h-[75vh] w-full bg-muted">
            {preview ? (
              preview.isPdf ? (
                <iframe
                  src={preview.url}
                  title={`${cert.title} certificate`}
                  className="h-full w-full"
                />
              ) : (
                <img
                  src={preview.url}
                  alt={`${cert.title} certificate`}
                  className="h-full w-full object-contain"
                />
              )
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
