import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import nathalieAsset from "@/assets/nathalie.webp";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import logo from "@/assets/NH_Logo_sv.svg";

// Nathalie must replace this with her own Calendly event URL.
const CALENDLY_URL = "https://calendly.com/nathalie-hakansson/intro";

const FALLBACK_IMAGES = [case1, case2, case3];

const CLIENT_BRANDS = [
  "IKEA / Ingka Group", "Toyota", "Merck", "Pfizer", "Atlas Copco",
  "Volvo", "Hitachi Energy", "Santander", "Ubisoft / Massive", "OECD",
  "Svenska Spel", "BSH Home Appliances",
];

type CaseStudy = {
  id: string;
  title: string;
  sector: string;
  summary: string | null;
  image_url: string | null;
  external_url: string | null;
  sort_order: number;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NH Consulting — Nathalie Håkansson" },
      {
        name: "description",
        content:
          "NH Consulting helps B2B companies grow through the customers they already have. Commercial strategy, customer insight and practical execution by Nathalie Håkansson.",
      },
      { property: "og:title", content: "NH Consulting — Nathalie Håkansson" },
      {
        property: "og:description",
        content:
          "Sustainable B2B growth from the customers you already have.",
      },
    ],
  }),
  component: Home,
});

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * -0.08;
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

function useCalendlyEmbed() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
}

function Home() {
  useCalendlyEmbed();
  const portraitRef = useParallax();

  const { data: cases } = useQuery({
    queryKey: ["case_studies", "published"],
    queryFn: async (): Promise<CaseStudy[]> => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id,title,sector,summary,image_url,external_url,sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center">
          <a href="#top" className="text-[11px] font-medium uppercase tracking-[0.35em]">
            <img src={logo} alt="NH Consulting" width={160}/>
          </a>
          <div className="hidden md:flex gap-10 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/70">
            <a href="#perspective" className="hover:text-foreground transition-colors">Perspective</a>
            <a href="#cases" className="hover:text-foreground transition-colors">Case</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* Hero — editorial, Norm-inspired */}
        <section className="min-h-[100svh] flex flex-col justify-end pb-20 px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="pt-40 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted animate-reveal">
                Front page — Scroll ↓
              </span>
              <h1 className="mt-8 font-display text-[2.5rem] md:text-[4.5rem] leading-[1.05] text-balance animate-reveal [animation-delay:120ms] max-w-[22ch]">
                Most companies don&rsquo;t lack new customers.
                <br />
                <span className="italic text-foreground/80">
                  They lack a strategy for the ones they already have.
                </span>
              </h1>
              <p className="mt-10 max-w-[52ch] text-lg text-foreground/70 leading-relaxed animate-reveal [animation-delay:240ms]">
                I help B2B companies create sustainable growth by unlocking the
                commercial value already hidden within their existing customer base.
              </p>
              <div className="mt-12 flex items-center gap-8 animate-reveal [animation-delay:360ms]">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] group"
                >
                  <span>Let&rsquo;s talk</span>
                  <span className="w-10 h-px bg-foreground group-hover:w-16 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width portrait with parallax */}
        <section className="relative w-full h-[90svh] overflow-hidden bg-secondary">
          <div
            ref={portraitRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: "scale(1.08)" }}
          >
            <img
              src={nathalieAsset}
              alt="Portrait of Nathalie Håkansson"
              className="w-full h-full object-cover object-[center_25%]"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 max-w-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/90">
              Nathalie Håkansson · Founder, NH Consulting
            </span>
          </div>
        </section>

        {/* Perspective */}
        <section id="perspective" className="py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            Perspective
          </span>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-16">
            <h2 className="md:col-span-7 font-display text-3xl md:text-5xl leading-[1.15] text-balance">
              The biggest growth opportunity already exists within your customer base.
              And growth shouldn&rsquo;t depend on luck.
              <span className="italic text-foreground/70"> It should be designed.</span>
            </h2>
            <div className="md:col-span-5 space-y-6 text-base text-foreground/70 leading-relaxed">
              <p>
                I help B2B companies build a structured way of growing existing
                customer relationships — so expansion becomes part of the
                business, not something that happens by accident.
              </p>
              <p>
                During my years in SaaS, I noticed that most B2B companies are
                experts at winning new business. Far fewer have a structured way
                of growing the clients they already have. Once a project is
                underway, focus naturally shifts to delivery. Meanwhile, the
                client&rsquo;s business evolves, new needs emerge, and new
                stakeholders become involved.
              </p>
              <p className="text-foreground">
                This is where many growth opportunities are lost.
              </p>
            </div>
          </div>

          <p className="mt-24 font-display italic text-xl md:text-2xl text-muted max-w-[42ch]">
            Acquiring a new customer typically costs 5–25× more than retaining an
            existing one.
          </p>
        </section>

        {/* How I work */}
        <section className="py-32 md:py-40 px-8 md:px-16 bg-foreground text-background">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-background/50">
                  How I work
                </span>
                <h2 className="mt-6 font-display text-4xl md:text-6xl italic max-w-[16ch] leading-[1.05]">
                  From insight to a repeatable way of working.
                </h2>
              </div>
              <p className="max-w-md text-base text-background/60 leading-relaxed">
                Four steps that turn hidden potential inside your existing
                customer base into a structured growth practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 md:gap-y-0 border-t border-background/15">
              {[
                { n: "01", h: "Identify", p: "Together, we identify where the greatest growth potential already exists — within your clients, relationships and commercial opportunities." },
                { n: "02", h: "Prioritise", p: "We determine which accounts, initiatives and stakeholders deserve your attention first." },
                { n: "03", h: "Activate", p: "We turn insights into action through structured client conversations, commercial initiatives and tangible growth opportunities." },
                { n: "04", h: "Build", p: "I help you create a repeatable way of working — making customer growth a natural part of your business, not a one-off initiative." },
              ].map((s, i) => (
                <div
                  key={s.n}
                  className={`pt-12 pb-4 ${i === 0 ? "md:pr-10" : i === 3 ? "md:pl-10" : "md:px-10"} ${i !== 3 ? "md:border-r" : ""} border-background/15`}
                >
                  <span className="font-mono text-xs text-background/50 block">
                    {s.n}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl mt-6 mb-4">{s.h}</h3>
                  <p className="text-sm text-background/60 leading-relaxed">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section id="cases" className="py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Case examples
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-6xl italic leading-[1.05] max-w-[18ch]">
                Selected work.
              </h2>
            </div>
            <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {String(cases?.length ?? 3).padStart(2, "0")} projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {(cases ?? []).map((c, i) => {
              const img = c.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
              return (
                <Link
                  key={c.id}
                  to="/project/$id"
                  params={{ id: c.id }}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-secondary mb-6 overflow-hidden">
                    <img
                      src={img}
                      alt={c.title}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-[0.25em]">
                    {c.sector}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display mt-3 leading-snug group-hover:italic transition-all">
                    {c.title}
                  </h3>
                  {c.summary && (
                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-[38ch]">
                      {c.summary}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]">
                    Read case <span className="w-6 h-px bg-foreground group-hover:w-12 transition-all" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-32 md:py-40 px-8 md:px-16 bg-secondary">
          <blockquote className="max-w-5xl mx-auto">
            <p className="font-display text-3xl md:text-5xl leading-[1.2] text-balance italic">
              &ldquo;Nathalie has an entrepreneurial mindset and a rare ability to
              understand businesses as a whole, rather than just the function
              she&rsquo;s working in.&rdquo;
            </p>
            <cite className="mt-10 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted not-italic">
              — Fred Bergklo · Solution Architect at Contentful
            </cite>
          </blockquote>
        </section>

        {/* About */}
        <section id="about" className="py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-secondary md:sticky md:top-32">
                <img
                  src={nathalieAsset.url}
                  alt="Nathalie Håkansson"
                  className="w-full h-full object-cover object-[center_25%]"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                About me
              </span>
              <h2 className="font-display text-3xl md:text-5xl mt-6 leading-[1.15] text-balance">
                <span className="italic">Why aren&rsquo;t more companies</span> working this way?
              </h2>
              <div className="mt-10 space-y-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-[58ch]">
                <p>
                  I&rsquo;ve always been fascinated by why some companies grow while
                  others don&rsquo;t. Not just through acquiring new customers, but
                  through the way they think, communicate and build relationships.
                  That curiosity has shaped almost every step of my career.
                </p>
                <p>
                  It started somewhere completely different. I studied Fine Arts
                  in Kraków before moving to Milan to complete a Master&rsquo;s
                  degree in Brand Management &amp; Communication at IED. At first
                  glance, art and SaaS might seem like two completely different
                  worlds. To me, they&rsquo;ve always been connected — both are
                  about understanding people, recognising patterns and seeing
                  opportunities others overlook.
                </p>
                <p>
                  Over the past decade, I&rsquo;ve worked with SaaS companies
                  ranging from early-stage startups to large enterprise
                  organisations, helping businesses create more value from their
                  existing customers. The best organisations didn&rsquo;t simply
                  acquire customers — they built systems for understanding,
                  developing and growing alongside them.
                </p>
                <p>
                  That question — <em>why aren&rsquo;t more companies working this
                  way?</em> — eventually became NH Consulting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brands strip */}
        <section className="py-24 px-8 md:px-16 border-y border-border">
          <div className="max-w-[1600px] mx-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              Brands I&rsquo;ve worked with
            </span>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-display text-xl md:text-2xl text-foreground/80">
              {CLIENT_BRANDS.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact + Calendly */}
        <section id="contact" className="py-32 md:py-48 px-8 md:px-16">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5 md:sticky md:top-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Contact
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-6xl italic leading-[1.05]">
                Let&rsquo;s talk.
              </h2>
              <p className="mt-8 text-base md:text-lg text-foreground/70 max-w-[42ch] leading-relaxed">
                Book a 45-minute conversation about the commercial opportunities
                inside your existing customer base — or reach out directly.
              </p>
              <ul className="mt-12 space-y-5 text-base">
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Email</span>
                  <a href="mailto:nathalie@nhconsulting.se" className="hover:text-primary transition-colors">
                    nathalie@nhconsulting.se
                  </a>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Phone</span>
                  <a href="tel:+46736818169" className="hover:text-primary transition-colors">
                    +46 73 681 81 69
                  </a>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">LinkedIn</span>
                  <a
                    href="https://linkedin.com/in/nathaliehakansson"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    nathaliehakansson
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-7 bg-background border border-border overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=f5f2ec&text_color=2a2620&primary_color=8a5a3c`}
                style={{ minWidth: 320, height: 720 }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-16 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <p className="font-display text-3xl italic">NH Consulting</p>
            <p className="mt-4 max-w-md text-sm text-background/60 leading-relaxed">
              Helping B2B companies grow through the customers they already have.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-background/60">
            <a href="mailto:nathalie@nhconsulting.se" className="hover:text-background transition-colors">nathalie@nhconsulting.se</a>
            <a href="https://linkedin.com/in/nathaliehakansson" target="_blank" rel="noreferrer" className="hover:text-background transition-colors">LinkedIn</a>
            <span>© {new Date().getFullYear()} · Nathalie Håkansson</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
