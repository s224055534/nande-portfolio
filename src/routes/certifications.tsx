import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section } from "@/components/Layout";
import { Eye, Plus, Pencil, Trash2, LogOut, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { extractCertificateOrg } from "@/lib/certificate-ocr.functions";
import { OrgLogo } from "@/components/OrgLogo";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Godidi Nande" },
      { name: "description", content: "Professional certifications and credentials." },
    ],
  }),
  component: CertificationsPage,
});

type Cert = {
  id: string;
  title: string;
  organization: string;
  date_issued: string;
  description: string | null;
  file_url: string | null;
  link_url: string | null;
};

type FormState = {
  title: string;
  organization: string;
  date_issued: string;
  description: string;
  link_url: string;
  file: File | null;
  existing_file_url: string | null;
};

const emptyForm: FormState = {
  title: "", organization: "", date_issued: "", description: "",
  link_url: "", file: null, existing_file_url: null,
};

function CertificationsPage() {
  const { user, isAdmin } = useAuth();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("date_issued", { ascending: false });
    if (error) toast.error(error.message);
    else setCerts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(c: Cert) {
    setEditing(c);
    setForm({
      title: c.title,
      organization: c.organization,
      date_issued: c.date_issued,
      description: c.description ?? "",
      link_url: c.link_url ?? "",
      file: null,
      existing_file_url: c.file_url,
    });
    setDialogOpen(true);
  }

  async function handleViewFile(path: string) {
    const { data, error } = await supabase.storage
      .from("certificates")
      .createSignedUrl(path, 60 * 60);
    if (error || !data) {
      toast.error("Could not open certificate");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let file_url = form.existing_file_url;
      if (form.file) {
        const ext = form.file.name.split(".").pop() ?? "bin";
        const path = `${user!.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("certificates")
          .upload(path, form.file, { contentType: form.file.type });
        if (upErr) throw upErr;
        file_url = path;
      }

      const payload = {
        title: form.title.trim(),
        organization: form.organization.trim(),
        date_issued: form.date_issued,
        description: form.description.trim() || null,
        link_url: form.link_url.trim() || null,
        file_url,
      };

      if (editing) {
        const { error } = await supabase.from("certifications").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Certification updated");
      } else {
        const { error } = await supabase.from("certifications").insert(payload);
        if (error) throw error;
        toast.success("Certification added");
      }
      setDialogOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(c: Cert) {
    if (!confirm(`Delete "${c.title}"?`)) return;
    if (c.file_url) {
      await supabase.storage.from("certificates").remove([c.file_url]);
    }
    const { error } = await supabase.from("certifications").delete().eq("id", c.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  }

  return (
    <>
      <div className="bg-gradient-subtle border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Credentials</p>
            <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Certifications</h1>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button onClick={openAdd} size="sm">
                <Plus className="h-4 w-4" /> Add Certification
              </Button>
            )}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={async () => { await supabase.auth.signOut(); toast.success("Signed out"); }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            ) : (
              <Link to="/auth" className="text-xs text-muted-foreground hover:text-foreground">Admin</Link>
            )}
          </div>
        </div>
      </div>

      <Section>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : certs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No certifications yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <article key={c.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-hero text-primary-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.organization}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                  {new Date(c.date_issued).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                </p>
                {c.description && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-border mt-5">
                  {c.file_url && (
                    <button
                      onClick={() => handleViewFile(c.file_url!)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  )}
                  {c.link_url && (
                    <a
                      href={c.link_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Link
                    </a>
                  )}
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => openEdit(c)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-background px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Certification" : "Add Certification"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Certificate Title *</Label>
              <Input id="title" required maxLength={200} value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="org">Issuing Organization *</Label>
              <Input id="org" required maxLength={200} value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Date Issued *</Label>
              <Input id="date" type="date" required value={form.date_issued}
                onChange={(e) => setForm({ ...form, date_issued: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Description (optional)</Label>
              <Textarea id="desc" maxLength={1000} rows={3} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="link">Viewable Link (optional)</Label>
              <Input id="link" type="url" placeholder="https://…" value={form.link_url}
                onChange={(e) => setForm({ ...form, link_url: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="file">Upload Certificate (PDF/Image, optional)</Label>
              <Input id="file" type="file" accept="application/pdf,image/*"
                onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} />
              {form.existing_file_url && !form.file && (
                <p className="text-xs text-muted-foreground">Existing file will be kept unless replaced.</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
