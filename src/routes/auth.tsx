import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Nathalie Håkansson" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="font-display text-4xl italic">Sign in</h1>
          <p className="text-sm text-muted mt-2">Admin access for Nathalie.</p>
        </div>
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-widest">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:outline-none focus:border-primary"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-widest">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-border rounded-md focus:outline-none focus:border-primary"
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-background py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-primary transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}