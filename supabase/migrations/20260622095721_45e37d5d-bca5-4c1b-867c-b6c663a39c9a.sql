
CREATE POLICY "Public can read certificate files"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'certificates');

CREATE POLICY "Admins can upload certificate files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificate files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certificate files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
