
ALTER TABLE public.case_studies
  ADD COLUMN context text,
  ADD COLUMN role text,
  ADD COLUMN content text,
  ADD COLUMN results text,
  ADD COLUMN client_list text,
  ADD COLUMN year text;
