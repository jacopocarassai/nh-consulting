import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as projectQuery, t as Route } from "./project._id-DnlFTd4I.mjs";
import { n as case_2_default, r as case_3_default, t as case_1_default } from "./case-3-DM3mmQVl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._id-BwqQsabt.js
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_IMAGES = [
	case_1_default,
	case_2_default,
	case_3_default
];
function renderBullets(md) {
	return md.split("\n").filter((l) => l.trim().startsWith("-")).map((l) => l.replace(/^\s*-\s*/, ""));
}
function renderBold(line) {
	return line.split(/(\*\*[^*]+\*\*)/g).map((p, i) => p.startsWith("**") && p.endsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
		className: "font-medium text-foreground",
		children: p.slice(2, -2)
	}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p }, i));
}
function ProjectPage() {
	const { id } = Route.useParams();
	const { data: p } = useSuspenseQuery(projectQuery(id));
	const fallback = FALLBACK_IMAGES[(p.sort_order - 1 + FALLBACK_IMAGES.length) % FALLBACK_IMAGES.length];
	const img = p.image_url || fallback;
	const bullets = p.results ? renderBullets(p.results) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-[11px] font-medium uppercase tracking-[0.35em]",
					children: "NH\xA0Consulting"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					hash: "cases",
					className: "text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/70 hover:text-foreground",
					children: "← All cases"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "pt-40 pb-16 px-8 md:px-16 max-w-[1600px] mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-12 gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
								children: ["Case · ", p.sector]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-8 font-display text-4xl md:text-7xl leading-[1.05] text-balance",
								children: p.title
							}),
							p.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 max-w-[52ch] text-lg md:text-xl text-foreground/70 leading-relaxed italic font-display",
								children: p.summary
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "md:col-span-4 md:pt-3 space-y-6 text-sm",
						children: [
							p.year && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
									children: "Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.year })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
									children: "Sector"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.sector })]
							}),
							p.external_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
									children: "Link"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: p.external_url,
									target: "_blank",
									rel: "noreferrer",
									className: "underline hover:text-primary",
									children: "Visit →"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full aspect-[16/9] bg-secondary overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img,
					alt: p.title,
					className: "w-full h-full object-cover",
					loading: "eager"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-24 md:py-32 px-8 md:px-16 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-16",
				children: [
					p.context && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "md:col-span-8 md:col-start-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
							children: "Context"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg md:text-xl text-foreground/80 leading-relaxed",
							children: p.context
						})]
					}),
					p.role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "md:col-span-8 md:col-start-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
							children: "My role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-base md:text-lg text-foreground/75 leading-relaxed whitespace-pre-line",
							children: p.role
						})]
					}),
					bullets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "md:col-span-8 md:col-start-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
							children: "Results"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 divide-y divide-border border-y border-border",
							children: bullets.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-4 flex gap-6 items-baseline text-base md:text-lg text-foreground/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: renderBold(line) })]
							}, i))
						})]
					}),
					p.client_list && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "md:col-span-8 md:col-start-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
							children: "Selected customers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-2xl md:text-3xl italic leading-snug text-foreground/85",
							children: p.client_list
						})]
					}),
					p.content && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "md:col-span-8 md:col-start-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
							children: "Reflection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display italic text-xl md:text-2xl leading-[1.4] text-foreground/85",
							children: p.content
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border py-20 px-8 md:px-16 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted",
					children: "Next"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-3xl md:text-4xl italic",
					children: "Let’s talk about your customer base."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					hash: "contact",
					className: "inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a conversation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-10 h-px bg-foreground group-hover:w-16 transition-all" })]
				})]
			})
		] })]
	});
}
//#endregion
export { ProjectPage as component };
