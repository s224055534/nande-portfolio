import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  path: z.string().min(1).max(500),
});

export const getCertificateSignedUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Validate the requested path corresponds to a real certification record.
    // This prevents path enumeration: only files referenced by the public
    // certifications listing can have a signed URL minted.
    const { data: row, error: lookupErr } = await supabaseAdmin
      .from("certifications")
      .select("id")
      .eq("file_url", data.path)
      .maybeSingle();

    if (lookupErr || !row) {
      throw new Error("Certificate not found");
    }

    const { data: signed, error } = await supabaseAdmin.storage
      .from("certificates")
      .createSignedUrl(data.path, 60 * 60);

    if (error || !signed) {
      throw new Error(error?.message ?? "Could not sign certificate URL");
    }

    return { url: signed.signedUrl };
  });
