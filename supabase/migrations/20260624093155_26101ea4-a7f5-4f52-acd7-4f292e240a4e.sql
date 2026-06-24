-- 1. Add generated has_file column so anon callers can still know whether a preview exists
ALTER TABLE public.certifications
  ADD COLUMN IF NOT EXISTS has_file boolean GENERATED ALWAYS AS (file_url IS NOT NULL) STORED;

-- 2. Tighten column-level grants: anon no longer sees file_url
REVOKE SELECT ON public.certifications FROM anon;
GRANT SELECT (
  id, title, organization, date_issued, description,
  link_url, display_order, created_at, updated_at, has_file
) ON public.certifications TO anon;

-- authenticated keeps full SELECT (admins need file_url for edit/delete)
GRANT SELECT ON public.certifications TO authenticated;