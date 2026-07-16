import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DVjYtJQd.mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-3gYn9i6r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function uploadImage(file) {
		if (!editing) return;
		setUploading(true);
		setError(null);
		const ext = file.name.split(".").pop();
		const path = `${crypto.randomUUID()}.${ext}`;
		const { error: uploadError } = await supabase.storage.from("case-study-images").upload(path, file, {
			cacheControl: "3600",
			upsert: false
		});
		if (uploadError) {
			setError(uploadError.message);
			setUploading(false);
			return;
		}
		const { data } = supabase.storage.from("case-study-images").getPublicUrl(path);
		setEditing({
			...editing,
			image_url: data.publicUrl
		});
		setUploading(false);
	}
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "case_studies"],
		queryFn: async () => {
			const { data, error } = await supabase.from("case_studies").select("*").order("sort_order", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function save() {
		if (!editing) return;
		setError(null);
		const payload = {
			title: editing.title ?? "",
			sector: editing.sector ?? "",
			summary: editing.summary ?? null,
			image_url: editing.image_url ?? null,
			external_url: editing.external_url ?? null,
			sort_order: editing.sort_order ?? 0,
			published: editing.published ?? true,
			context: editing.context ?? null,
			role: editing.role ?? null,
			content: editing.content ?? null,
			results: editing.results ?? null,
			client_list: editing.client_list ?? null,
			year: editing.year ?? null
		};
		const { error } = editing.id ? await supabase.from("case_studies").update(payload).eq("id", editing.id) : await supabase.from("case_studies").insert(payload);
		if (error) return setError(error.message);
		setEditing(null);
		qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
		qc.invalidateQueries({ queryKey: ["case_studies", "published"] });
	}
	async function remove(id) {
		if (!confirm("Delete this case study?")) return;
		const { error } = await supabase.from("case_studies").delete().eq("id", id);
		if (error) return setError(error.message);
		qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
		qc.invalidateQueries({ queryKey: ["case_studies", "published"] });
	}
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground px-6 md:px-12 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl italic",
						children: "Case studies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted mt-1",
						children: "Edit what's shown on your homepage."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEditing({
								title: "",
								sector: "",
								summary: "",
								sort_order: (data?.length ?? 0) + 1,
								published: true
							}),
							className: "bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary transition-colors",
							children: "+ New"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: signOut,
							className: "border border-border px-4 py-2 text-xs uppercase tracking-widest hover:border-primary transition-colors",
							children: "Sign out"
						})]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive mb-6",
					children: error
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Loading…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border border-y border-border",
					children: (data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-6 flex items-start justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-widest text-muted",
										children: c.sector
									}), !c.published && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-widest text-primary",
										children: "Draft"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl italic mt-1",
									children: c.title
								}),
								c.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted mt-2 max-w-xl",
									children: c.summary
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditing(c),
								className: "text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-primary",
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(c.id),
								className: "text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-destructive hover:text-destructive",
								children: "Delete"
							})]
						})]
					}, c.id))
				}),
				editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-6 z-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background w-full max-w-lg p-8 rounded-2xl border border-border space-y-4 max-h-[90vh] overflow-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl italic",
								children: editing.id ? "Edit case study" : "New case study"
							}),
							[
								[
									"title",
									"Title",
									"text"
								],
								[
									"sector",
									"Sector",
									"text"
								],
								[
									"year",
									"Year",
									"text"
								],
								[
									"summary",
									"Summary",
									"textarea"
								],
								[
									"context",
									"Context",
									"textarea"
								],
								[
									"role",
									"My role",
									"textarea"
								],
								[
									"results",
									"Results (markdown, one - per line, **bold** allowed)",
									"textarea"
								],
								[
									"client_list",
									"Client list (separator ·)",
									"textarea"
								],
								[
									"content",
									"Reflection",
									"textarea"
								],
								[
									"image_url",
									"Image URL",
									"text"
								],
								[
									"external_url",
									"External URL",
									"text"
								],
								[
									"sort_order",
									"Sort order",
									"number"
								]
							].map(([key, label, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-widest text-muted",
									children: label
								}), type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 3,
									value: editing[key] ?? "",
									onChange: (e) => setEditing({
										...editing,
										[key]: e.target.value
									}),
									className: "w-full px-3 py-2 bg-transparent border border-border rounded"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type,
									value: editing[key] ?? "",
									onChange: (e) => setEditing({
										...editing,
										[key]: type === "number" ? Number(e.target.value) : e.target.value
									}),
									className: "w-full px-3 py-2 bg-transparent border border-border rounded"
								})]
							}, key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-widest text-muted",
										children: "Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Image URL",
											value: editing.image_url ?? "",
											onChange: (e) => setEditing({
												...editing,
												image_url: e.target.value
											}),
											className: "flex-1 px-3 py-2 bg-transparent border border-border rounded"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-primary cursor-pointer shrink-0",
											children: [uploading ? "Uploading…" : "Browse", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												disabled: uploading,
												onChange: (e) => {
													const file = e.target.files?.[0];
													if (file) uploadImage(file);
												}
											})]
										})]
									}),
									editing.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: editing.image_url,
										alt: "",
										className: "mt-2 h-24 object-cover rounded border border-border"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: editing.published ?? true,
									onChange: (e) => setEditing({
										...editing,
										published: e.target.checked
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Published"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: save,
									className: "bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary",
									children: "Save"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setEditing(null),
									className: "border border-border px-4 py-2 text-xs uppercase tracking-widest",
									children: "Cancel"
								})]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { AdminPage as component };
