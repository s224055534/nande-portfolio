import { createFileRoute } from "@tanstack/react-router";
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
      { name: "description", content: "Professional certifications and credentials earned by Godidi Nande across software development, IT, and emerging technologies." },
      { property: "og:title", content: "Certifications — Godidi Nande" },
      { property: "og:description", content: "Verified professional credentials and certifications across software development and IT." },
      { property: "og:url", content: "https://nande-portfolio.lovable.app/certifications" },
    ],
    links: [{ rel: "canonical", href: "https://nande-portfolio.lovable.app/certifications" }],
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
  const [ocrLoading, setOcrLoading] = useState(false);
  const runOcr = useServerFn(extractCertificateOrg);

  async function handleFileChange(file: File | null) {
    setForm((f) => ({ ...f, file }));
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";
    if (!isImage && !isPdf) return;
    if (file.size > 8 * 1024 * 1024) return; // skip very large files
    setOcrLoading(true);
    try {
      const buf = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const fileBase64 = btoa(binary);
      const result = await runOcr({
        data: { fileBase64, mimeType: file.type, filename: file.name },
      });
      setForm((f) => ({
        ...f,
        organization: f.organization || (result.organization ?? ""),
        title: f.title || (result.title ?? ""),
      }));
      if (result.organization) toast.success(`Detected: ${result.organization}`);
    } catch (err) {
      console.error(err);
      toast.error("Could not auto-detect organization. Please enter it manually.");
    } finally {
      setOcrLoading(false);
    }
  }


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
            ) : null}
          </div>
        </div>
      </div>

      <Section>
        <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">My Credentials</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : certs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No certifications yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <CertCard
                key={c.id}
                cert={c}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
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
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
              {ocrLoading && (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> Detecting issuing organization…
                </p>
              )}
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
