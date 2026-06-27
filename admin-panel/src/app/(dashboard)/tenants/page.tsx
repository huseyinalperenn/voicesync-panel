"use client";

import { useState } from "react";
import { Building2, Plus, Search, MoreVertical, CheckCircle, Clock, XCircle, ChevronRight, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tenants = [
  { id: "1", name: "ACME Corp", email: "admin@acme.com", plan: "Pro", status: "active", calls: 1847, usage: 92, created: "10 Mar 2026" },
  { id: "2", name: "TechStart A.Ş.", email: "admin@techstart.com", plan: "Starter", status: "active", calls: 312, usage: 62, created: "15 Mar 2026" },
  { id: "3", name: "Megastore Ltd.", email: "admin@megastore.com", plan: "Enterprise", status: "active", calls: 8432, usage: 45, created: "01 Nis 2026" },
  { id: "4", name: "Yıldız Teknoloji", email: "info@yildiz.com", plan: "Pro", status: "trial", calls: 89, usage: 18, created: "05 Haz 2026" },
  { id: "5", name: "Mavi Deniz Turizm", email: "it@mavideniz.com", plan: "Starter", status: "suspended", calls: 145, usage: 0, created: "20 Şub 2026" },
  { id: "6", name: "Ankara Sağlık Grubu", email: "tech@ankara-saglik.com", plan: "Pro", status: "active", calls: 2341, usage: 78, created: "28 Şub 2026" },
];

const planColors = {
  Starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Pro: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Enterprise: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const statusConfig = {
  active: { label: "Aktif", icon: CheckCircle, className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  trial: { label: "Deneme", icon: Clock, className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  suspended: { label: "Askıda", icon: XCircle, className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

function UsageBar({ value }: { value: number }) {
  const color = value > 80 ? "#A064C6" : value > 50 ? "#568FC8" : "#35A6A8";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-muted-foreground">{value}%</span>
    </div>
  );
}

function TenantForm({ tenant, onClose }: { tenant?: typeof tenants[0] | null; onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 w-[420px] glass-card border-l border-white/10 flex flex-col z-50">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <p className="font-semibold text-foreground">{tenant ? "Tenant Düzenle" : "Yeni Tenant"}</p>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Firma Adı</label>
          <Input defaultValue={tenant?.name} placeholder="Firma adı..." className="bg-white/5 border-white/10 text-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Admin E-posta</label>
          <Input defaultValue={tenant?.email} type="email" placeholder="admin@firma.com" className="bg-white/5 border-white/10 text-sm" />
        </div>
        {!tenant && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Geçici Şifre</label>
            <Input type="password" placeholder="En az 8 karakter" className="bg-white/5 border-white/10 text-sm" />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Plan</label>
          <select className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground">
            <option>Starter</option>
            <option selected={tenant?.plan === "Pro"}>Pro</option>
            <option selected={tenant?.plan === "Enterprise"}>Enterprise</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Durum</label>
          <select className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground">
            <option>active</option>
            <option>trial</option>
            <option>suspended</option>
          </select>
        </div>
      </div>
      <div className="p-5 border-t border-white/10 flex gap-2">
        <Button variant="outline" className="flex-1 border-white/10" onClick={onClose}>İptal</Button>
        <Button className="flex-1 bg-primary hover:bg-primary/90 gap-1.5"><Save className="w-3.5 h-3.5" /> Kaydet</Button>
      </div>
    </div>
  );
}

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<typeof tenants[0] | null>(null);

  const filtered = tenants.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.email.includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || t.plan === planFilter;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tenant Yönetimi</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{tenants.length} tenant kayıtlı</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus className="w-3.5 h-3.5" /> Yeni Tenant
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Firma veya e-posta ara..." className="pl-8 h-9 text-sm bg-white/5 border-white/10" />
        </div>
        <div className="flex items-center gap-1.5">
          {["all", "Starter", "Pro", "Enterprise"].map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                planFilter === p ? "bg-primary/15 text-primary border-primary/20" : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {p === "all" ? "Tümü" : p}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Firma</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Plan</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Çağrılar</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Kullanım</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Kayıt</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const sc = statusConfig[t.status as keyof typeof statusConfig];
              const StatusIcon = sc.icon;
              return (
                <tr key={t.id} className="border-b border-white/8 last:border-0 hover:bg-white/3 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs", planColors[t.plan as keyof typeof planColors])}>{t.plan}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs gap-1", sc.className)}>
                      <StatusIcon className="w-3 h-3" />{sc.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{t.calls.toLocaleString("tr-TR")}</span>
                  </td>
                  <td className="px-4 py-3"><UsageBar value={t.usage} /></td>
                  <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{t.created}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-white/8" onClick={() => { setEditing(t); setShowForm(true); }}>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Tenant bulunamadı</p>
          </div>
        )}
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowForm(false)} />
          <TenantForm tenant={editing} onClose={() => setShowForm(false)} />
        </>
      )}
    </div>
  );
}