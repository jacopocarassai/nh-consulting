
CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sector text NOT NULL,
  summary text,
  image_url text,
  external_url text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.case_studies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_studies TO authenticated;
GRANT ALL ON public.case_studies TO service_role;

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published case studies"
  ON public.case_studies FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated can view all case studies"
  ON public.case_studies FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert case studies"
  ON public.case_studies FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update case studies"
  ON public.case_studies FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete case studies"
  ON public.case_studies FOR DELETE TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.tg_case_studies_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.tg_case_studies_updated_at();

INSERT INTO public.case_studies (title, sector, summary, sort_order) VALUES
('Scaling Net Revenue Retention by 40% at LeadStream', 'FinTech / SaaS', 'Rebuilt the post-sale motion to compound account value from existing customers.', 1),
('Designing the Global Advocacy Program for Vélos', 'Direct-to-Enterprise', 'Turned top customers into a repeatable, measurable growth channel.', 2),
('Strategic Expansion Framework for North-Point Hub', 'B2B Logistics', 'Mapped latent expansion signals across a mature account base.', 3);
