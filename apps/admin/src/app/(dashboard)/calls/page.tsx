"use client";

import { useState } from "react";
import { Phone, Search, Building2, Clock, ChevronRight, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const calls = [
  { id: "1", tenant: "ACME Corp", caller: "+90 532 111 2233", duration: "4:32", status: "resolved", direction: "inbound", time: "14:23", date: "Bugün", model: "GPT-4o" },
  { id: "2", tenant: "TechStart A.Ş.", caller: "+90 543 222 3344", duration: "1:15", status: "escalated", direction: "inbound", time: "13:45", date: "Bugün", model: "GPT-4o" },
  { id: "3", tenant: "Megastore Ltd.", caller: "+90 505 333 4455", duration: "7:08", status: "resolved", direction: "inbound", time: "12:10", date: "Bugün", model: "GPT-4o" },
  { id: "4", tenant: "ACME Corp", caller: "+90 532 444 5566", duration: "2:44", status: "missed", direction: "inbound", time: "11:30", date: "Bugün", model: "GPT-4o" },
  { id: "5", tenant: "Ankara Sağlık", caller: "+90 543 555 6677", duration: "5:55", status: "resolved", direction: "outbound", time: "10:15", date: "Bugün", model: "GPT-4o" },
  { id: "6", tenant: "Megastore Ltd.", caller: "+90 505 666 7788", duration: "3:22", status: "resolved", direction: "inbound", time: "09:05", date: "Bugün", model: "GPT-4o" },
  { id: "7", tenant: "Yıldız Teknoloji", caller: "+90 532 777 8899", duration: "0:45", status: "missed", direction: "inbound", time: "19:30", date: "Dün", model: "GPT-4o" },
  { id: "8", tenant: "TechStart A.Ş.", caller: "+90 543 888 9900", duration: "6:18", status: "escalated", direction: "inbound", time: "16:20", date: "Dün", model: "GPT-4o" },
];

const statusConfig = {
  resolved: { label: "Çözüldü", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  escalated: { label: "Yönlendirildi", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  missed: { label: "Cevapsız", className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

function DirectionIcon({ direction, status }: { direction: string; status: string }) {
  if (status === "missed") return <PhoneMissed className="w-3.5 h-3.5 text-red-400" />;
  if (direction === "outbound") return <PhoneOutgoing className="w-3.5 h-3.5 text-primary" />;
  return <PhoneIncoming className="w-3.5 h-3.5 text-emerald-400" />;
}

export default function AdminCallsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = calls.filter((c) => {
    const matchSearch = c.caller.includes(search) || c.tenant.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: calls.length,
    resolved: calls.filter(c => c.status === "resolved").length,
    escalated: calls.filter(c => c.status === "escalated").length,
    missed: calls.filter(c => c.status === "missed").length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Çağrı Merkezi</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Platform geneli tüm çağrılar</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Toplam", value: stats.total, color: "#8B6DE5" },
          { label: "Çözüldü", value: stats.resolved, color: "#35A6A8" },
          { label: "Yönlendirildi", value: stats.escalated, color: "#568FC8" },
          { label: "Cevapsız", value: stats.missed, color: "#A064C6" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl border border-white/10 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{s.label}</p>
            <p className="text-3xl font-semibold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Numara veya tenant ara..." className="pl-8 h-9 text-sm bg-white/5 border-white/10" />
        </div>
        <div className="flex items-center gap-1.5">
          {["all", "resolved", "escalated", "missed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                statusFilter === s ? "bg-primary/15 text-primary border-primary/20" : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {s === "all" ? "Tümü" : statusConfig[s as keyof typeof statusConfig]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Arayan</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tenant</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tarih</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Süre</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((call) => {
              const cfg = statusConfig[call.status as keyof typeof statusConfig];
              return (
                <tr key={call.id} className="border-b border-white/8 last:border-0 hover:bg-white/3 cursor-pointer transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <DirectionIcon direction={call.direction} status={call.status} />
                      <span className="text-sm text-foreground font-medium">{call.caller}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{call.tenant}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{call.date} {call.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />{call.duration}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs", cfg.className)}>{cfg.label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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