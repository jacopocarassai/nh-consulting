import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Case studies" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});



type Row = {
  id: string;
  title: string;
  sector: string;
  summary: string | null;
  image_url: string | null;
  external_url: string | null;
  sort_order: number;
  published: boolean;
  context: string | null;
  role: string | null;
  content: string | null;
  results: string | null;
  client_list: string | null;
  year: string | null;
};

function AdminPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [editing, setEditing] = useState<Partial<Row> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loggedUserEmail, setLoggedUserEmail] = useState<string | undefined>(undefined);

  async function fetchUser(){
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email;
  }

  useEffect(() => {
    fetchUser().then(setLoggedUserEmail);
  }, []);


  async function uploadImage(file: File) {
    if (!editing) return;
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("case-study-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("case-study-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
    setUploading(false);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "case_studies"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
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
      year: editing.year ?? null,
    };
    const { data: rows, error } = editing.id
      ? await supabase.from("case_studies").update(payload).eq("id", editing.id).select()
      : await supabase.from("case_studies").insert(payload).select();
    if (error) return setError(error.message);
    if (!rows || rows.length === 0) {
      return setError("No rows were affected — check that you have permission to edit this case study.");
    }
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
    qc.invalidateQueries({ queryKey: ["case_studies", "published"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this case study?")) return;
    const { data: rows, error } = await supabase.from("case_studies").delete().eq("id", id).select();
    if (error) return setError(error.message);
    if (!rows || rows.length === 0) {
      return setError("No rows were affected — check that you have permission to delete this case study.");
    }
    qc.invalidateQueries({ queryKey: ["admin", "case_studies"] });
    qc.invalidateQueries({ queryKey: ["case_studies", "published"] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  useEffect( ()=> {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            setEditing(null);
        }
    })
  })

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl italic">Case studies</h1>
            <p className="text-sm text-muted mt-1">Edit what's shown on your homepage.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-sm">You are connected as {loggedUserEmail}</span>
            <button
              onClick={() =>
                setEditing({
                  title: "",
                  sector: "",
                  summary: "",
                  sort_order: (data?.length ?? 0) + 1,
                  published: true,
                })
              }
              className="bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary transition-colors"
            >
              + New
            </button>
            <button
              onClick={signOut}
              className="border border-border px-4 py-2 text-xs uppercase tracking-widest hover:border-primary transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        {error && <p className="text-sm text-destructive mb-6">{error}</p>}

        {isLoading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {(data ?? []).map((c) => (
              <li key={c.id} className="py-6 flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {c.sector}
                    </span>
                    {!c.published && (
                      <span className="text-[10px] uppercase tracking-widest text-primary">
                        Draft
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl italic mt-1">{c.title}</h3>
                  {c.summary && (
                    <p className="text-sm text-muted mt-2 max-w-xl">{c.summary}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditing(c)}
                    className="text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-destructive hover:text-destructive"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {editing && (
          <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-6 z-50">
            <div className="bg-background w-full max-w-lg p-8 rounded-2xl border border-border space-y-4 max-h-[90vh] overflow-auto">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl italic">
                  {editing.id ? "Edit case study" : "New case study"}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  aria-label="Close"
                  className="text-foreground/50 hover:text-foreground transition-colors text-xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
              {(
                [
                  ["title", "Title", "text"],
                  ["sector", "Sector", "text"],
                  ["year", "Year", "text"],
                  ["summary", "Summary", "textarea"],
                  ["context", "Context", "textarea"],
                  ["role", "My role", "textarea"],
                  ["results", "Results (markdown, one - per line, **bold** allowed)", "textarea"],
                  ["client_list", "Client list (separator ·)", "textarea"],
                  ["content", "Reflection", "textarea"],
                  ["image_url", "Image URL", "text"],
                  ["external_url", "External URL", "text"],
                  ["sort_order", "Sort order", "number"],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="block space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted">{label}</span>
                  {type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={(editing[key] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      className="w-full px-3 py-2 bg-transparent border border-border rounded"
                    />
                  ) : (
                    <input
                      type={type}
                      value={(editing[key] as string | number | undefined) ?? ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [key]: type === "number" ? Number(e.target.value) : e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-transparent border border-border rounded"
                    />
                  )}
                </label>
              ))}
              <label className="block space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-muted">Image</span>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={editing.image_url ?? ""}
                    onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                    className="flex-1 px-3 py-2 bg-transparent border border-border rounded"
                  />
                  <label className="text-xs uppercase tracking-widest border border-border px-3 py-2 hover:border-primary cursor-pointer shrink-0">
                    {uploading ? "Uploading…" : "Browse"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadImage(file);
                      }}
                    />
                </label>
              </div>
              {editing.image_url && (
                <img src={editing.image_url} alt="" className="mt-2 h-24 object-cover rounded border border-border" />
              )}
            </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.published ?? true}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                <span className="text-sm">Published</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={save}
                  className="bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="border border-border px-4 py-2 text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}