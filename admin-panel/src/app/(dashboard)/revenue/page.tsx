"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const monthlyRevenue = [
  { month: "Oca", amount: 12400 }, { month: "Şub", amount: 14200 }, { month: "Mar", amount: 15800 },
  { month: "Nis", amount: 18600 }, { month: "May", amount: 21400 }, { month: "Haz", amount: 24200 },
];

const tenantRevenue = [
  { name: "ACME Corp", plan: "Pro", mrr: 4990, calls: 1847, status: "active" },
  { name: "Megastore Ltd.", plan: "Enterprise", mrr: 12990, calls: 8432, status: "active" },
  { name: "Ankara Sağlık Grubu", plan: "Pro", mrr: 4990, calls: 2341, status: "active" },
  { name: "TechStart A.Ş.", plan: "Starter", mrr: 990, calls: 312, status: "active" },
  { name: "Yıldız Teknoloji", plan: "Pro", mrr: 0, calls: 89, status: "trial" },
  { name: "Mavi Deniz Turizm", plan: "Starter", mrr: 0, calls: 0, status: "suspended" },
];

const invoices = [
  { id: "INV-2026-024", tenant: "Megastore Ltd.", amount: 12990, date: "1 Haz 2026", status: "paid" },
  { id: "INV-2026-023", tenant: "ACME Corp", amount: 4990, date: "1 Haz 2026", status: "paid" },
  { id: "INV-2026-022", tenant: "Ankara Sağlık Grubu", amount: 4990, date: "1 Haz 2026", status: "paid" },
  { id: "INV-2026-021", tenant: "TechStart A.Ş.", amount: 990, date: "1 Haz 2026", status: "pending" },
  { id: "INV-2026-020", tenant: "Megastore Ltd.", amount: 12990, date: "1 May 2026", status: "paid" },
  { id: "INV-2026-019", tenant: "ACME Corp", amount: 4990, date: "1 May 2026", status: "paid" },
];

const planColors = {
  Starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Pro: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Enterprise: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const statusConfig = {
  paid: { label: "Ödendi", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pending: { label: "Bekliyor", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  failed: { label: "Başarısız", className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function RevenuePage() {
  const totalMrr = tenantRevenue.filter(t => t.status === "active").reduce((s, t) => s + t.mrr, 0);
  const activeTenants = tenantRevenue.filter(t => t.status === "active").length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Gelir & Faturalama</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Platform gelir takibi ve fatura yönetimi</p>
      </div>

      {/* MRR metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Aylık Gelir (MRR)", value: `₺${totalMrr.toLocaleString("tr-TR")}`, color: "#8B6DE5" },
          { label: "Yıllık Projeksiyon", value: `₺${(totalMrr * 12).toLocaleString("tr-TR")}`, color: "#35A6A8" },
          { label: "Ödeme Yapan Tenant", value: activeTenants.toString(), color: "#568FC8" },
          { label: "Ort. Gelir/Tenant", value: `₺${Math.round(totalMrr / activeTenants).toLocaleString("tr-TR")}`, color: "#A064C6" },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-xl border border-white/10 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{m.label}</p>
            <p className="text-2xl font-semibold mt-1" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Aylık Gelir Trendi (₺)</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6DE5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B6DE5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown) => [`₺${Number(v).toLocaleString("tr-TR")}`, "Gelir"]}
              />
              <Area type="monotone" dataKey="amount" stroke="#8B6DE5" strokeWidth={2} fill="url(#rg1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Tenant Gelir Kırılımı (₺/ay)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tenantRevenue.filter(t => t.mrr > 0)} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown) => [`₺${Number(v).toLocaleString("tr-TR")}`, "MRR"]}
              />
              <Bar dataKey="mrr" fill="#35A6A8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tenant table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 bg-white/3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tenant Gelir Detayı</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tenant</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Plan</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">MRR</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Çağrılar</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
            </tr>
          </thead>
          <tbody>
            {tenantRevenue.map((t) => (
              <tr key={t.name} className="border-b border-white/8 last:border-0 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground font-medium">{t.name}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={cn("text-xs", planColors[t.plan as keyof typeof planColors])}>{t.plan}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold" style={{ color: t.mrr > 0 ? "#8B6DE5" : "var(--muted-foreground)" }}>
                    {t.mrr > 0 ? `₺${t.mrr.toLocaleString("tr-TR")}` : "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t.calls.toLocaleString("tr-TR")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", {
                      "bg-emerald-400": t.status === "active",
                      "bg-cyan-400": t.status === "trial",
                      "bg-red-400": t.status === "suspended",
                    })} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {t.status === "active" ? "Aktif" : t.status === "trial" ? "Deneme" : "Askıda"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 bg-white/3 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Son Faturalar</p>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
            <Download className="w-3 h-3" /> Tümünü İndir
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Fatura No</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tenant</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tarih</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tutar</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const sc = statusConfig[inv.status as keyof typeof statusConfig];
              return (
                <tr key={inv.id} className="border-b border-white/8 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{inv.tenant}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">₺{inv.amount.toLocaleString("tr-TR")}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs", sc.className)}>{sc.label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-white/8">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}