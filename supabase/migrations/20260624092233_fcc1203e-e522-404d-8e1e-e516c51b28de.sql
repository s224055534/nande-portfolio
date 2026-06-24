DROP POLICY IF EXISTS "Public can read certificate files" ON storage.objects;

CREATE POLICY "Admins can read certificate files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));