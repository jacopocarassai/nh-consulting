import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getConsent, onConsentChange, type ConsentState } from "@/lib/cookie-consent";
import { CookieBanner } from "@/components/ui/CookieBanner";
import nathalieAsset from "@/assets/nathalie.webp";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import logo from "@/assets/NH_Logo_sv.svg";
import silentLogo from "@/assets/nh-logo-silent-header.png";
import parallaxImage from "@/assets/parallax.jpg";

const CALENDLY_URL = "https://calendly.com/nathalie-nhconsulting";

const FALLBACK_IMAGES = [case1, case2, case3];

const CLIENT_BRANDS = [
  "IKEA / Ingka Group", "Toyota", "Merck", "Pfizer", "Atlas Copco",
  "Volvo", "Hitachi Energy", "Santander", "Ubisoft / Massive", "OECD",
  "Svenska Spel", "BSH Home Appliances",
];

const TESTIMONIALS = [
  {
    quote:
      "Nathalie has an entrepreneurial mindset and a rare ability to understand businesses as a whole, rather than just the function she's working in.",
    cite: "Fred Bergklo · Solution Architect at Contentful",
  },
  {
    quote: "Nathalie has a strong commercial mindset and a genuine ability to build lasting customer relationships. She quickly identifies growth opportunities, drives initiatives forward and consistently creates value for both customers and the business",
    cite: "George Storm · CRN of N.Rich and Founder of Break The Box",
  },
];

function useCarousel(length: number, intervalMs = 6000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  return { index, setIndex };
}

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
          "NH Consulting helps B2B companies grow sustainably through the customers they already have — commercial strategy and practical execution.",
      },
      { property: "og:title", content: "NH Consulting — Nathalie Håkansson" },
      { property: "og:site_name", content: "NH Consulting" },
      {
        property: "og:description",
        content:
          "Sustainable B2B growth from the customers you already have.",
      },
      { property: "og:image", content: "https://i.ibb.co/x88DjwD6/logo-og.jpg" },
      { property: "og:image:width", content: "1000" },
      { property: "og:image:height", content: "562" },
      { property: "og:url", content: "https://nhconsulting.se" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NH Consulting — Nathalie Håkansson" },
      {
        name: "twitter:description",
        content: "Sustainable B2B growth from the customers you already have.",
      },
      { name: "twitter:image", content: "https://i.ibb.co/x88DjwD6/logo-og.jpg" },
        ],
  }),
  component: Home,
});

function useParallax(intensity = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const total = viewportH + rect.height;
        const progress = 1 - (rect.top + rect.height) / total;
        const clamped = Math.max(0, Math.min(1, progress));
        const maxShift = rect.height * intensity;
        const offset = (clamped - 0.5) * maxShift;
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(${1 + intensity * 2})`;
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

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useCalendlyEmbed() {
  const [enabled, setEnabled] = useState(() => getConsent()?.functional ?? false);

  useEffect(() => onConsentChange(() => setEnabled(getConsent()?.functional ?? false)), []);

  useEffect(() => {
    if (!enabled) return;
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [enabled]);

  return enabled;
}

function useAnalytics() {
  const [enabled, setEnabled] = useState(() => getConsent()?.analytics ?? false);

  useEffect(() => onConsentChange(() => setEnabled(getConsent()?.analytics ?? false)), []);

  useEffect(() => {
    if (!enabled) return;
    const id = "ga-script";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-CTXQHDXTS4";
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-CTXQHDXTS4");
  }, [enabled]);
}

function PolicyModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background text-foreground w-full max-w-2xl max-h-[85vh] overflow-auto rounded-2xl border border-border p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <h2 className="font-display text-3xl italic">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-foreground/50 hover:text-foreground transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="space-y-6 text-sm text-foreground/75 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function PolicySection({ heading, children }: { heading?: string; children: React.ReactNode }) {
  return (
    <div>
      {heading && (
        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
          {heading}
        </h3>
      )}
      {children}
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <>
      <p className="text-xs text-muted">Last updated: July 2026</p>
      <p>NH Consulting respects your privacy and is committed to protecting your personal data.</p>

      <PolicySection heading="What information we collect">
        <p>When you contact us or book a meeting, we may collect:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Company</li>
          <li>Phone number (if provided)</li>
          <li>Any information you choose to share with us</li>
        </ul>
        <p className="mt-3">We may also collect anonymous website analytics through cookies.</p>
      </PolicySection>

      <PolicySection heading="Why we collect your data">
        <p>We use your information to:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Respond to enquiries</li>
          <li>Schedule meetings</li>
          <li>Deliver our services</li>
          <li>Improve our website and user experience</li>
        </ul>
        <p className="mt-3">We do not sell your personal information.</p>
      </PolicySection>

      <PolicySection heading="Third-party services">
        <p>We may use trusted third-party providers, such as:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Calendly (meeting bookings)</li>
          <li>Google Analytics (website analytics)</li>
          <li>Google Workspace (email)</li>
          <li>Other service providers necessary to operate our business</li>
        </ul>
        <p className="mt-3">These providers process personal data according to their own privacy policies.</p>
      </PolicySection>

      <PolicySection heading="Your rights">
        <p>Under GDPR, you have the right to:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Object to certain processing</li>
          <li>Withdraw consent where applicable</li>
        </ul>
        <p className="mt-3">To exercise your rights, please contact us.</p>
      </PolicySection>

      <PolicySection heading="Contact">
        <p>NH Consulting</p>
        <p>
          Email:{" "}
          <a href="mailto:nathalie@nhconsulting.se" className="underline hover:text-primary">
            nathalie@nhconsulting.se
          </a>
        </p>
        <p>VAT number: SE881209460801</p>
      </PolicySection>
    </>
  );
}

function CookiePolicyContent() {
  return (
    <>
      <p>This website uses cookies to improve your browsing experience.</p>
      <div>
        <p>Cookies may be used for:</p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Website functionality</li>
          <li>Website analytics</li>
          <li>Performance improvements</li>
        </ul>
      </div>
      <p>You can manage or disable cookies through your browser settings.</p>
      <p>If required by applicable law, we will request your consent before placing non-essential cookies.</p>
    </>
  );
}

function Home() {
  const calendlyEnabled = useCalendlyEmbed();
  useAnalytics();
  const portraitRef = useParallax();
  const scrolled = useScrolled();
  const [policyModal, setPolicyModal] = useState<"privacy" | "cookie" | null>(null);
  const [consent, setConsentState] = useState<ConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { index: testimonialIndex, setIndex: setTestimonialIndex } = useCarousel(TESTIMONIALS.length);

  useEffect(() => {
    const current = getConsent();
    setConsentState(current);
    setShowBanner(current === null);
    return onConsentChange(() => {
      const updated = getConsent();
      setConsentState(updated);
    });
  }, []);

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
    <div className="min-h-screen text-foreground selection:bg-primary/20">
      {/* Nav */}
       <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
          }`}
        >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex md:justify-between justify-center items-center">
          <a href="#top" className="text-[11px] font-medium uppercase tracking-[0.35em]">
            <img src={logo} alt="NH Consulting" width={160} className="nh-logo-header hidden md:block" />
            <img
              src={scrolled ? silentLogo : logo}
              alt="NH Consulting"
              width={scrolled ? 40 : 160}
              className="nh-logo-header md:hidden"
            />
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
        <section className="relative min-h-[100svh] flex flex-col justify-end pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-20 hero-gradient-bg" />
          {/* <div className="absolute inset-0 -z-10 bg-background/70" /> */}
          <div className="absolute inset-0 -z-20 aurora-bg">
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
          </div>
          <div className="px-8 md:px-16 max-w-[1600px] mx-auto w-full pt-40 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
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

        <section className="relative w-full h-[90svh] overflow-hidden bg-secondary">
          <div
            ref={portraitRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: "scale(1.08)" }}
          >
            <img
              src={parallaxImage}
              alt="Portrait of Nathalie Håkansson"
              className="w-full h-full object-cover object-[center_65%]"
              loading="eager"
            />
          </div>

          {/* Slowly shifting duotone wash pulling the photo toward the site palette */}
          <div className="absolute inset-0 mix-blend-soft-light portrait-tint" />

          {/* Drifting aura glows bleeding in from the corners */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="portrait-aura-1 mix-blend-screen" />
            <div className="portrait-aura-2 mix-blend-screen" />
          </div>

          {/* Fades into the nav above and the section below */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 max-w-md">

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

          <p className="mt-24 font-bold text-xl md:text-2xl text-muted max-w-[42ch]">
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
          <section className="py-32 md:py-40 px-8 md:px-16 bg-secondary overflow-hidden">
            <div className="max-w-5xl mx-auto">
                   <div className="grid">
                    {TESTIMONIALS.map((t, i) => (
                      <blockquote
                        key={i}
                        aria-hidden={i !== testimonialIndex}
                        className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                          i === testimonialIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <p className="text-3xl md:text-5xl leading-[1.2] text-balance">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <cite className="mt-10 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted not-italic">
                          — {t.cite}
                        </cite>
                      </blockquote>
                    ))}
                  </div>
                  {TESTIMONIALS.length > 1 && (
                    <div className="mt-12 flex gap-3">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setTestimonialIndex(i)}
                          aria-label={`Show testimonial ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === testimonialIndex ? "w-8 bg-foreground" : "w-1.5 bg-foreground/25"
                          }`}
                        />
                      ))}
                    </div>
                  )}
            </div>
          </section>

        {/* About */}
        <section id="about" className="py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-secondary md:sticky md:top-32">
                <img
                  src={nathalieAsset}
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
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                Let&rsquo;s talk.
              </h2>
              <p className="mt-8 text-base md:text-lg text-foreground/70 max-w-[42ch] leading-relaxed">
                Book a 30-minute conversation about the commercial opportunities
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
            <div className="md:col-span-7 bg-background overflow-hidden">
              {calendlyEnabled ? (
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?text_color=25160e&primary_color=dacdbc`}
                  style={{ minWidth: 320, height: 700 }}
                />
              ) : (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center border border-border rounded-2xl p-8">
                  <p className="text-sm text-foreground/70 max-w-sm">
                    Enable functional cookies to load the booking calendar here.
                  </p>
                  <button
                    onClick={() => setShowBanner(true)}
                    className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] underline hover:text-primary transition-colors"
                  >
                    Cookie settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-16 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
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

          <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between gap-6 text-[11px] text-background/50 leading-relaxed">
            <div className="space-y-1">
              <p>NH Consulting</p>
              <p>Stockholm, Sweden</p>
              <p>Registered business in Sweden</p>
              <p>
                <a href="mailto:nathalie@nhconsulting.se" className="hover:text-background transition-colors">
                  nathalie@nhconsulting.se
                </a>
                {" · "}
                <a href="tel:+46736818169" className="hover:text-background transition-colors">
                  +46 73 681 81 69
                </a>
              </p>
            </div>
            <div className="flex gap-6 font-mono uppercase tracking-[0.2em] shrink-0">
              <button
                onClick={() => setPolicyModal("privacy")}
                className="hover:text-background transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setPolicyModal("cookie")}
                className="hover:text-background transition-colors"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => setShowBanner(true)}
                className="hover:text-background transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {policyModal === "privacy" && (
        <PolicyModal title="Privacy Policy" onClose={() => setPolicyModal(null)}>
          <PrivacyPolicyContent />
        </PolicyModal>
      )}
      {policyModal === "cookie" && (
        <PolicyModal title="Cookie Policy" onClose={() => setPolicyModal(null)}>
          <CookiePolicyContent />
        </PolicyModal>
      )}
      {showBanner && (
        <CookieBanner
          initial={consent}
          onDone={() => setShowBanner(false)}
          onOpenPolicy={() => {
            setShowBanner(false);
            setPolicyModal("cookie");
          }}
        />
      )}
    </div>
  );
}