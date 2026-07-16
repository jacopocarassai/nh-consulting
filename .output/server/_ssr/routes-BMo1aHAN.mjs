import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DVjYtJQd.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as case_2_default, r as case_3_default, t as case_1_default } from "./case-3-DM3mmQVl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BMo1aHAN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nathalie_default = "/assets/nathalie-I9ue4xde.webp";
var NH_Logo_sv_default = "/assets/NH_Logo_sv-Cl52dr9u.svg";
var CALENDLY_URL = "https://calendly.com/nathalie-hakansson/intro";
var FALLBACK_IMAGES = [
	case_1_default,
	case_2_default,
	case_3_default
];
var CLIENT_BRANDS = [
	"IKEA / Ingka Group",
	"Toyota",
	"Merck",
	"Pfizer",
	"Atlas Copco",
	"Volvo",
	"Hitachi Energy",
	"Santander",
	"Ubisoft / Massive",
	"OECD",
	"Svenska Spel",
	"BSH Home Appliances"
];
function useParallax() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const offset = (el.getBoundingClientRect().top - window.innerHeight / 2) * -.08;
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
	(0, import_react.useEffect)(() => {
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
		queryFn: async () => {
			const { data, error } = await supabase.from("case_studies").select("id,title,sector,summary,image_url,external_url,sort_order").eq("published", true).order("sort_order", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground selection:bg-primary/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#top",
						className: "text-[11px] font-medium uppercase tracking-[0.35em]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: NH_Logo_sv_default,
							alt: "NH Consulting",
							width: 160
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex gap-10 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#perspective",
								className: "hover:text-foreground transition-colors",
								children: "Perspective"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#cases",
								className: "hover:text-foreground transition-colors",
								children: "Case"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#about",
								className: "hover:text-foreground transition-colors",
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								className: "hover:text-foreground transition-colors",
								children: "Contact"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "min-h-[100svh] flex flex-col justify-end pb-20 px-8 md:px-16 max-w-[1600px] mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-40 grid grid-cols-1 md:grid-cols-12 gap-12 items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted animate-reveal",
										children: "Front page — Scroll ↓"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-8 font-display text-[2.5rem] md:text-[4.5rem] leading-[1.05] text-balance animate-reveal [animation-delay:120ms] max-w-[22ch]",
										children: [
											"Most companies don’t lack new customers.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "italic text-foreground/80",
												children: "They lack a strategy for the ones they already have."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-10 max-w-[52ch] text-lg text-foreground/70 leading-relaxed animate-reveal [animation-delay:240ms]",
										children: "I help B2B companies create sustainable growth by unlocking the commercial value already hidden within their existing customer base."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-12 flex items-center gap-8 animate-reveal [animation-delay:360ms]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#contact",
											className: "inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Let’s talk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-10 h-px bg-foreground group-hover:w-16 transition-all" })]
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative w-full h-[90svh] overflow-hidden bg-secondary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: portraitRef,
								className: "absolute inset-0 will-change-transform",
								style: { transform: "scale(1.08)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: nathalie_default,
									alt: "Portrait of Nathalie Håkansson",
									className: "w-full h-full object-cover object-[center_25%]",
									loading: "eager"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-8 left-8 md:bottom-12 md:left-16 max-w-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-background/90",
									children: "Nathalie Håkansson · Founder, NH Consulting"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "perspective",
						className: "py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
								children: "Perspective"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid grid-cols-1 md:grid-cols-12 gap-16",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "md:col-span-7 font-display text-3xl md:text-5xl leading-[1.15] text-balance",
									children: ["The biggest growth opportunity already exists within your customer base. And growth shouldn’t depend on luck.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-foreground/70",
										children: " It should be designed."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-5 space-y-6 text-base text-foreground/70 leading-relaxed",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I help B2B companies build a structured way of growing existing customer relationships — so expansion becomes part of the business, not something that happens by accident." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "During my years in SaaS, I noticed that most B2B companies are experts at winning new business. Far fewer have a structured way of growing the clients they already have. Once a project is underway, focus naturally shifts to delivery. Meanwhile, the client’s business evolves, new needs emerge, and new stakeholders become involved." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground",
											children: "This is where many growth opportunities are lost."
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-24 font-display italic text-xl md:text-2xl text-muted max-w-[42ch]",
								children: "Acquiring a new customer typically costs 5–25× more than retaining an existing one."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-32 md:py-40 px-8 md:px-16 bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[1600px] mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row justify-between items-start gap-12 mb-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.35em] text-background/50",
									children: "How I work"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 font-display text-4xl md:text-6xl italic max-w-[16ch] leading-[1.05]",
									children: "From insight to a repeatable way of working."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-md text-base text-background/60 leading-relaxed",
									children: "Four steps that turn hidden potential inside your existing customer base into a structured growth practice."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-y-16 md:gap-y-0 border-t border-background/15",
								children: [
									{
										n: "01",
										h: "Identify",
										p: "Together, we identify where the greatest growth potential already exists — within your clients, relationships and commercial opportunities."
									},
									{
										n: "02",
										h: "Prioritise",
										p: "We determine which accounts, initiatives and stakeholders deserve your attention first."
									},
									{
										n: "03",
										h: "Activate",
										p: "We turn insights into action through structured client conversations, commercial initiatives and tangible growth opportunities."
									},
									{
										n: "04",
										h: "Build",
										p: "I help you create a repeatable way of working — making customer growth a natural part of your business, not a one-off initiative."
									}
								].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `pt-12 pb-4 ${i === 0 ? "md:pr-10" : i === 3 ? "md:pl-10" : "md:px-10"} ${i !== 3 ? "md:border-r" : ""} border-background/15`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-background/50 block",
											children: s.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl md:text-3xl mt-6 mb-4",
											children: s.h
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-background/60 leading-relaxed",
											children: s.p
										})
									]
								}, s.n))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "cases",
						className: "py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end mb-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
								children: "Case examples"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 font-display text-4xl md:text-6xl italic leading-[1.05] max-w-[18ch]",
								children: "Selected work."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
								children: [String(cases?.length ?? 3).padStart(2, "0"), " projects"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8",
							children: (cases ?? []).map((c, i) => {
								const img = c.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/project/$id",
									params: { id: c.id },
									className: "group block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[4/5] bg-secondary mb-6 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img,
												alt: c.title,
												width: 800,
												height: 1e3,
												loading: "lazy",
												className: "w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-muted uppercase tracking-[0.25em]",
											children: c.sector
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl md:text-3xl font-display mt-3 leading-snug group-hover:italic transition-all",
											children: c.title
										}),
										c.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm text-foreground/60 leading-relaxed max-w-[38ch]",
											children: c.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]",
											children: ["Read case ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-6 h-px bg-foreground group-hover:w-12 transition-all" })]
										})
									]
								}, c.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-32 md:py-40 px-8 md:px-16 bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "max-w-5xl mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl md:text-5xl leading-[1.2] text-balance italic",
								children: "“Nathalie has an entrepreneurial mindset and a rare ability to understand businesses as a whole, rather than just the function she’s working in.”"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", {
								className: "mt-10 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted not-italic",
								children: "— Fred Bergklo · Solution Architect at Contentful"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "about",
						className: "py-32 md:py-48 px-8 md:px-16 max-w-[1600px] mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid md:grid-cols-12 gap-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/5] overflow-hidden bg-secondary md:sticky md:top-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: nathalie_default.url,
										alt: "Nathalie Håkansson",
										className: "w-full h-full object-cover object-[center_25%]",
										loading: "lazy"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-7 md:col-start-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
										children: "About me"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "font-display text-3xl md:text-5xl mt-6 leading-[1.15] text-balance",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic",
											children: "Why aren’t more companies"
										}), " working this way?"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-10 space-y-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-[58ch]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I’ve always been fascinated by why some companies grow while others don’t. Not just through acquiring new customers, but through the way they think, communicate and build relationships. That curiosity has shaped almost every step of my career." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It started somewhere completely different. I studied Fine Arts in Kraków before moving to Milan to complete a Master’s degree in Brand Management & Communication at IED. At first glance, art and SaaS might seem like two completely different worlds. To me, they’ve always been connected — both are about understanding people, recognising patterns and seeing opportunities others overlook." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Over the past decade, I’ve worked with SaaS companies ranging from early-stage startups to large enterprise organisations, helping businesses create more value from their existing customers. The best organisations didn’t simply acquire customers — they built systems for understanding, developing and growing alongside them." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"That question — ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "why aren’t more companies working this way?" }),
												" — eventually became NH Consulting."
											] })
										]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-24 px-8 md:px-16 border-y border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[1600px] mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
								children: "Brands I’ve worked with"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 flex flex-wrap gap-x-10 gap-y-4 font-display text-xl md:text-2xl text-foreground/80",
								children: CLIENT_BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b }, b))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "contact",
						className: "py-32 md:py-48 px-8 md:px-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-5 md:sticky md:top-32",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
										children: "Contact"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-6 font-display text-4xl md:text-6xl italic leading-[1.05]",
										children: "Let’s talk."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-8 text-base md:text-lg text-foreground/70 max-w-[42ch] leading-relaxed",
										children: "Book a 45-minute conversation about the commercial opportunities inside your existing customer base — or reach out directly."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-12 space-y-5 text-base",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex justify-between border-b border-border pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
													children: "Email"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "mailto:nathalie@nhconsulting.se",
													className: "hover:text-primary transition-colors",
													children: "nathalie@nhconsulting.se"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex justify-between border-b border-border pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
													children: "Phone"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "tel:+46736818169",
													className: "hover:text-primary transition-colors",
													children: "+46 73 681 81 69"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex justify-between border-b border-border pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
													children: "LinkedIn"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "https://linkedin.com/in/nathaliehakansson",
													target: "_blank",
													rel: "noreferrer",
													className: "hover:text-primary transition-colors",
													children: "nathaliehakansson"
												})]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-7 bg-background border border-border overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "calendly-inline-widget",
									"data-url": `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=f5f2ec&text_color=2a2620&primary_color=8a5a3c`,
									style: {
										minWidth: 320,
										height: 720
									}
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "bg-foreground text-background py-16 px-8 md:px-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl italic",
						children: "NH Consulting"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm text-background/60 leading-relaxed",
						children: "Helping B2B companies grow through the customers they already have."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:items-end gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-background/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:nathalie@nhconsulting.se",
								className: "hover:text-background transition-colors",
								children: "nathalie@nhconsulting.se"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://linkedin.com/in/nathaliehakansson",
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-background transition-colors",
								children: "LinkedIn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" · Nathalie Håkansson"
							] })
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
