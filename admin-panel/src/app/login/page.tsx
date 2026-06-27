"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Satellite, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password });
      if (data.user.role !== "admin") {
        setError("Bu panel sadece admin kullanıcıları içindir.");
        return;
      }
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 grid-bg">
      <div className="radial-atmosphere fixed inset-0 pointer-events-none" />
      <div className="relative w-full max-w-sm z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-3 signal-glow">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Orbital Command</h1>
          <p className="text-sm text-muted-foreground mt-1">Admin terminale bağlanın</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="glass-card rounded-xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/8">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Güvenli bağlantı</span>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">E-posta</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@voicesync.com"
                required
                autoComplete="email"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Şifre</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="bg-white/5 border-white/10"
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Bağlanıyor...
              </>
            ) : (
              "Terminale Bağlan"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}