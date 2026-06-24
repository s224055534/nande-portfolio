REVOKE SELECT ON public.certifications FROM anon;
GRANT SELECT (
  id, title, organization, date_issued, description,
  link_url, display_order, created_at, updated_at, has_file
) ON public.certifications TO anon;