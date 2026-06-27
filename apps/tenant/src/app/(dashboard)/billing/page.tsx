"use client";

import { CreditCard, Download, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const plans = [
  {
    id: "starter", name: "Starter", price: "₺990", period: "/ay",
    minutes: 500, features: ["500 dk/ay", "1 asistan", "Temel analitik", "E-posta destek"],
    current: false,
  },
  {
    id: "pro", name: "Pro", price: "₺2.490", period: "/ay",
    minutes: 2000, features: ["2.000 dk/ay", "5 asistan", "Gelişmiş analitik", "Öncelikli destek", "RAG entegrasyonu", "Ses klonlama"],
    current: true,
  },
  {
    id: "enterprise", name: "Enterprise", price: "Özel", period: "",
    minutes: -1, features: ["Sınırsız dakika", "Sınırsız asistan", "SLA garanti", "Özel entegrasyon", "Hesap yöneticisi"],
    current: false,
  },
];

const usage = [
  { day: "1", min: 45 }, { day: "3", min: 78 }, { day: "5", min: 62 },
  { day: "7", min: 91 }, { day: "9", min: 55 }, { day: "10", min: 83 },
];

const invoices = [
  { month: "Mayıs 2026", minutes: 1847, amount: "₺2.490", status: "paid", date: "01.06.2026" },
  { month: "Nisan 2026", minutes: 1623, amount: "₺2.490", status: "paid", date: "01.05.2026" },
  { month: "Mart 2026", minutes: 2011, amount: "₺2.490", status: "paid", date: "01.04.2026" },
  { month: "Şubat 2026", minutes: 1234, amount: "₺990", status: "paid", date: "01.03.2026" },
];

const used = 1247;
const total = 2000;
const pct = Math.round((used / total) * 100);

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Faturalama</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Plan, kullanım ve ödeme bilgileri</p>
      </div>

      {/* Current usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Bu Ay Kullanım</p>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Pro</Badge>
          </div>
          <div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-semibold text-foreground tracking-tight">{used.toLocaleString("tr-TR")}</span>
              <span className="text-lg text-muted-foreground mb-0.5">/ {total.toLocaleString("tr-TR")} dk</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: pct > 80 ? "#A064C6" : "linear-gradient(90deg, #6B3FFF, #0ABCD0)"
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">%{pct} kullanıldı</span>
              <span className="text-xs text-muted-foreground">{(total - used).toLocaleString("tr-TR")} dk kaldı</span>
            </div>
          </div>
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5" />
              Bu ay tahmini: <span className="text-foreground font-medium">₺2.490</span>
            </div>
            <span className="text-xs text-muted-foreground">Sonraki fatura: 01.07.2026</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Ödeme Yöntemi</p>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Son: 12/27</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs">Kartı Güncelle</Button>
        </div>
      </div>

      {/* Usage chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Günlük Kullanım (dk)</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={usage} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} Haz`} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="min" fill="#6B3FFF" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Plans */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Planlar</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-5 space-y-4 transition-all ${plan.current ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{plan.name}</p>
                  <div className="flex items-baseline gap-0.5 mt-1">
                    <span className="text-2xl font-bold text-foreground tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                {plan.current && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Mevcut</Badge>}
              </div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <Button
                  variant={plan.id === "enterprise" ? "outline" : "default"}
                  size="sm"
                  className={`w-full text-sm ${plan.id !== "enterprise" ? "bg-primary hover:bg-primary/90" : ""}`}
                >
                  {plan.id === "enterprise" ? "İletişime Geç" : "Yükselt"}
                </Button>
              )}
              {plan.current && (
                <Button variant="outline" size="sm" className="w-full text-sm">Mevcut Plan</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Fatura Geçmişi</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Dönem</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Dakika</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tutar</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.month} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{inv.month}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{inv.minutes.toLocaleString("tr-TR")} dk</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{inv.amount}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" /> Ödendi
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                    <Download className="w-3 h-3" /> PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}