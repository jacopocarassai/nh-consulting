import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

const FALLBACK_IMAGES = [case1, case2, case3];

type ProjectDetail = {
  id: string;
  title: string;
  sector: string;
  summary: string | null;
  image_url: string | null;
  external_url: string | null;
  context: string | null;
  role: string | null;
  content: string | null;
  results: string | null;
  client_list: string | null;
  year: string | null;
  sort_order: number;
};

function projectQuery(id: string) {
  return queryOptions({
    queryKey: ["case_study", id],
    queryFn: async (): Promise<ProjectDetail> => {
      const { data, error } = await supabase
        .from("case_studies")
        .select(
          "id,title,sector,summary,image_url,external_url,context,role,content,results,client_list,year,sort_order",
        )
        .eq("id", id)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data as ProjectDetail;
    },
  });
}

export const Route = createFileRoute("/project/$id")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(projectQuery(params.id)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Case · NH Consulting` : "Case · NH Consulting" },
      loaderData?.summary
        ? { name: "description", content: loaderData.summary }
        : { name: "description", content: "Case study from NH Consulting." },
    ],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-4xl italic">Case not found</h1>
      <Link to="/" className="text-[11px] uppercase tracking-[0.3em] underline">
        Back to home
      </Link>
    </div>
  ),
});

function renderBullets(md: string) {
  return md
    .split("\n")
    .filter((l) => l.trim().startsWith("-"))
    .map((l) => l.replace(/^\s*-\s*/, ""));
}

function renderBold(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-medium text-foreground">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function ProjectPage() {
  const { id } = Route.useParams();
  const { data: p } = useSuspenseQuery(projectQuery(id));
  const fallback = FALLBACK_IMAGES[(p.sort_order - 1 + FALLBACK_IMAGES.length) % FALLBACK_IMAGES.length];
  const img = p.image_url || fallback;
  const bullets = p.results ? renderBullets(p.results) : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center">
          <Link to="/" className="text-[11px] font-medium uppercase tracking-[0.35em]">
            NH&nbsp;Consulting
          </Link>
          <Link
            to="/"
            hash="cases"
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/70 hover:text-foreground"
          >
            ← All cases
          </Link>
        </div>
      </nav>

      <article>
        {/* Hero */}
        <header className="pt-40 pb-16 px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Case · {p.sector}
              </span>
              <h1 className="mt-8 font-display text-4xl md:text-7xl leading-[1.05] text-balance">
                {p.title}
              </h1>
              {p.summary && (
                <p className="mt-8 max-w-[52ch] text-lg md:text-xl text-foreground/70 leading-relaxed italic font-display">
                  {p.summary}
                </p>
              )}
            </div>
            <aside className="md:col-span-4 md:pt-3 space-y-6 text-sm">
              {p.year && (
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Year</span>
                  <span>{p.year}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-border pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Sector</span>
                <span>{p.sector}</span>
              </div>
              {p.external_url && (
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Link</span>
                  <a href={p.external_url} target="_blank" rel="noreferrer" className="underline hover:text-primary">
                    Visit →
                  </a>
                </div>
              )}
            </aside>
          </div>
        </header>

        {/* Hero image */}
        <div className="w-full aspect-[16/9] bg-secondary overflow-hidden">
          <img
            src={img}
            alt={p.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Body */}
        <div className="py-24 md:py-32 px-8 md:px-16 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-16">
          {p.context && (
            <section className="md:col-span-8 md:col-start-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">Context</span>
              <p className="mt-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                {p.context}
              </p>
            </section>
          )}

          {p.role && (
            <section className="md:col-span-8 md:col-start-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">My role</span>
              <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed whitespace-pre-line">
                {p.role}
              </p>
            </section>
          )}

          {bullets.length > 0 && (
            <section className="md:col-span-8 md:col-start-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">Results</span>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {bullets.map((line, i) => (
                  <li key={i} className="py-4 flex gap-6 items-baseline text-base md:text-lg text-foreground/80">
                    <span className="font-mono text-[10px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{renderBold(line)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.client_list && (
            <section className="md:col-span-8 md:col-start-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Selected customers
              </span>
              <p className="mt-6 font-display text-2xl md:text-3xl italic leading-snug text-foreground/85">
                {p.client_list}
              </p>
            </section>
          )}

          {p.content && (
            <section className="md:col-span-8 md:col-start-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Reflection
              </span>
              <p className="mt-6 font-display italic text-xl md:text-2xl leading-[1.4] text-foreground/85">
                {p.content}
              </p>
            </section>
          )}
        </div>

        <div className="border-t border-border py-20 px-8 md:px-16 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">Next</span>
            <p className="mt-4 font-display text-3xl md:text-4xl italic">
              Let&rsquo;s talk about your customer base.
            </p>
          </div>
          <Link
            to="/"
            hash="contact"
            className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] group"
          >
            <span>Book a conversation</span>
            <span className="w-10 h-px bg-foreground group-hover:w-16 transition-all" />
          </Link>
        </div>
      </article>
    </div>
  );
}