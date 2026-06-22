import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Input = {
  fileBase64: string; // raw base64, no data: prefix
  mimeType: string;
  filename?: string;
};

export const extractCertificateOrg = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: Input) => {
    if (!input?.fileBase64 || !input?.mimeType) {
      throw new Error("fileBase64 and mimeType are required");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const isImage = data.mimeType.startsWith("image/");
    const isPdf = data.mimeType === "application/pdf";
    if (!isImage && !isPdf) {
      return { organization: null, title: null };
    }

    const dataUrl = `data:${data.mimeType};base64,${data.fileBase64}`;
    const contentBlocks: Array<Record<string, unknown>> = [
      {
        type: "text",
        text:
          "This is a certificate. Identify the issuing organization (the company, school, or institution that granted it) and the certificate title. Respond with ONLY a JSON object: {\"organization\": string|null, \"title\": string|null}. Use the official short name of the organization (e.g. \"Microsoft\", \"Google\", \"Coursera\", \"AWS\"). No extra text.",
      },
    ];

    if (isImage) {
      contentBlocks.push({ type: "image_url", image_url: { url: dataUrl } });
    } else {
      contentBlocks.push({
        type: "file",
        file: { filename: data.filename ?? "certificate.pdf", file_data: dataUrl },
      });
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "user", content: contentBlocks }],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[ocr] gateway error", res.status, errText);
      if (res.status === 429) throw new Error("Rate limit exceeded. Try again later.");
      if (res.status === 402) throw new Error("AI credits exhausted.");
      return { organization: null, title: null };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content ?? "";
    try {
      const parsed = JSON.parse(text) as { organization?: string | null; title?: string | null };
      return {
        organization: parsed.organization?.trim() || null,
        title: parsed.title?.trim() || null,
      };
    } catch {
      return { organization: null, title: null };
    }
  });
