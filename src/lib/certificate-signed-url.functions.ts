import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  certId: z.string().uuid(),
});

export const getCertificateSignedUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Look up the file path server-side by certification id. The path is
    // never exposed to anon clients — we only mint a short-lived signed URL
    // for a known certification record.
    const { data: row, error: lookupErr } = await supabaseAdmin
      .from("certifications")
      .select("file_url")
      .eq("id", data.certId)
      .maybeSingle();

    if (lookupErr || !row || !row.file_url) {
      throw new Error("Certificate not found");
    }

    const { data: signed, error } = await supabaseAdmin.storage
      .from("certificates")
      .createSignedUrl(row.file_url, 60 * 60);

    if (error || !signed) {
      throw new Error(error?.message ?? "Could not sign certificate URL");
    }

    const isPdf = row.file_url.toLowerCase().endsWith(".pdf");
    return { url: signed.signedUrl, isPdf };
  });
