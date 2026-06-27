"use client";

import { useState } from "react";
import { Users, Plus, Search, Shield, User, Building2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const users = [
  { id: "1", name: "Admin Kullanıcı", email: "admin@voicesync.com", role: "admin", tenant: null, status: "active", lastLogin: "Bugün 09:15" },
  { id: "2", name: "Ahmet Yılmaz", email: "tenant@acme.com", role: "tenant", tenant: "ACME Corp", status: "active", lastLogin: "Bugün 11:30" },
  { id: "3", name: "Ayşe Kaya", email: "admin@techstart.com", role: "tenant", tenant: "TechStart A.Ş.", status: "active", lastLogin: "Dün 16:45" },
  { id: "4", name: "Mehmet Demir", email: "admin@megastore.com", role: "tenant", tenant: "Megastore Ltd.", status: "active", lastLogin: "Bugün 08:00" },
  { id: "5", name: "Zeynep Arslan", email: "info@yildiz.com", role: "tenant", tenant: "Yıldız Teknoloji", status: "active", lastLogin: "5 Haz 2026" },
  { id: "6", name: "Support Admin", email: "support@voicesync.com", role: "admin", tenant: null, status: "active", lastLogin: "Bugün 10:22" },
  { id: "7", name: "Mavi Deniz IT", email: "it@mavideniz.com", role: "tenant", tenant: "Mavi Deniz Turizm", status: "suspended", lastLogin: "20 Mar 2026" },
];

const roleConfig = {
  admin: { label: "Admin", icon: Shield, className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  tenant: { label: "Tenant", icon: Building2, className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Kullanıcı Yönetimi</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{users.length} kullanıcı</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Yeni Kullanıcı
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="İsim veya e-posta ara..." className="pl-8 h-9 text-sm bg-white/5 border-white/10" />
        </div>
        <div className="flex items-center gap-1.5">
          {["all", "admin", "tenant"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                roleFilter === r ? "bg-primary/15 text-primary border-primary/20" : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {r === "all" ? "Tümü" : roleConfig[r as keyof typeof roleConfig].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Toplam", value: users.length, color: "#8B6DE5" },
          { label: "Admin", value: users.filter(u => u.role === "admin").length, color: "#A064C6" },
          { label: "Tenant", value: users.filter(u => u.role === "tenant").length, color: "#35A6A8" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl border border-white/10 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{s.label}</p>
            <p className="text-3xl font-semibold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Kullanıcı</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Rol</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tenant</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Son Giriş</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const rc = roleConfig[u.role as keyof typeof roleConfig];
              const RoleIcon = rc.icon;
              return (
                <tr key={u.id} className="border-b border-white/8 last:border-0 hover:bg-white/3 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs gap-1", rc.className)}>
                      <RoleIcon className="w-3 h-3" />{rc.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{u.tenant ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", u.status === "active" ? "bg-emerald-400" : "bg-red-400")} />
                      <span className="text-xs text-muted-foreground capitalize">{u.status === "active" ? "Aktif" : "Askıda"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{u.lastLogin}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-white/8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-3.5 h-3.5" />
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