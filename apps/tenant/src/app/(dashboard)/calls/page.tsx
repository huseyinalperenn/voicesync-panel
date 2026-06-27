"use client";

import { useState } from "react";
import { Phone, Search, Filter, Clock, ChevronRight, PhoneIncoming, PhoneOutgoing, PhoneMissed, X, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const calls = [
  { id: "1", caller: "+90 532 111 2233", duration: "4:32", status: "resolved", direction: "inbound", time: "14:23", date: "Bugün", model: "GPT-4o", sentiment: 85, transcript: [{ role: "ai", text: "Merhaba, VoiceSync asistanınız. Size nasıl yardımcı olabilirim?" }, { role: "user", text: "Hesabımı kapatmak istiyorum." }, { role: "ai", text: "Üzgünüm bunu duymak. Sizi ilgili departmana bağlayabilirim." }] },
  { id: "2", caller: "+90 543 222 3344", duration: "1:15", status: "escalated", direction: "inbound", time: "13:45", date: "Bugün", model: "GPT-4o", sentiment: 42 },
  { id: "3", caller: "+90 505 333 4455", duration: "7:08", status: "resolved", direction: "inbound", time: "12:10", date: "Bugün", model: "GPT-4o", sentiment: 91 },
  { id: "4", caller: "+90 532 444 5566", duration: "2:44", status: "missed", direction: "inbound", time: "11:30", date: "Bugün", model: "GPT-4o", sentiment: 0 },
  { id: "5", caller: "+90 543 555 6677", duration: "5:55", status: "resolved", direction: "outbound", time: "10:15", date: "Bugün", model: "GPT-4o", sentiment: 78 },
  { id: "6", caller: "+90 505 666 7788", duration: "3:22", status: "resolved", direction: "inbound", time: "09:05", date: "Bugün", model: "GPT-4o", sentiment: 88 },
  { id: "7", caller: "+90 532 777 8899", duration: "0:45", status: "missed", direction: "inbound", time: "19:30", date: "Dün", model: "GPT-4o", sentiment: 0 },
  { id: "8", caller: "+90 543 888 9900", duration: "6:18", status: "escalated", direction: "inbound", time: "16:20", date: "Dün", model: "GPT-4o", sentiment: 35 },
  { id: "9", caller: "+90 505 999 0011", duration: "4:01", status: "resolved", direction: "outbound", time: "14:00", date: "Dün", model: "GPT-4o", sentiment: 82 },
  { id: "10", caller: "+90 532 000 1122", duration: "2:33", status: "resolved", direction: "inbound", time: "11:45", date: "Dün", model: "GPT-4o", sentiment: 90 },
];

const statusConfig = {
  resolved: { label: "Çözüldü", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  escalated: { label: "Yönlendirildi", className: "bg-amber-50 text-amber-700 border-amber-200" },
  missed: { label: "Cevapsız", className: "bg-red-50 text-red-600 border-red-200" },
};

function DirectionIcon({ direction, status }: { direction: string; status: string }) {
  if (status === "missed") return <PhoneMissed className="w-3.5 h-3.5 text-red-500" />;
  if (direction === "outbound") return <PhoneOutgoing className="w-3.5 h-3.5 text-primary" />;
  return <PhoneIncoming className="w-3.5 h-3.5 text-emerald-500" />;
}

function SentimentBar({ value }: { value: number }) {
  if (value === 0) return <span className="text-xs text-muted-foreground">—</span>;
  const color = value >= 70 ? "bg-emerald-400" : value >= 40 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{value}%</span>
    </div>
  );
}

function CallDetail({ call, onClose }: { call: typeof calls[0]; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const cfg = statusConfig[call.status as keyof typeof statusConfig];
  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-card border-l border-border shadow-xl flex flex-col z-50">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <p className="font-semibold text-foreground">{call.caller}</p>
          <p className="text-xs text-muted-foreground">{call.date} {call.time} · {call.duration}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>

      <div className="px-5 py-3 border-b border-border flex items-center gap-3 flex-wrap">
        <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
        <span className="text-xs text-muted-foreground">Model: {call.model}</span>
        <SentimentBar value={call.sentiment} />
      </div>

      {/* Waveform player */}
      <div className="px-5 py-4 border-b border-border">
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center gap-3">
          <Button size="icon" variant="outline" className="w-8 h-8 rounded-full flex-shrink-0" onClick={() => setPlaying(!playing)}>
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <div className="flex-1 h-8 flex items-center gap-0.5">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/30 rounded-full" style={{ height: `${20 + Math.sin(i * 0.8) * 14 + Math.random() * 8}%` }} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">{call.duration}</span>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Transkript</p>
        {(call.transcript ?? [
          { role: "ai", text: "Merhaba, size nasıl yardımcı olabilirim?" },
          { role: "user", text: "Siparişim hakkında bilgi almak istiyorum." },
          { role: "ai", text: "Tabii ki, sipariş numaranızı paylaşır mısınız?" },
          { role: "user", text: "12345 numaralı siparişim." },
          { role: "ai", text: "Siparişiniz kargoya verilmiş, 2 iş günü içinde ulaşacak." },
        ]).map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[80%] rounded-xl px-3 py-2 text-sm",
              msg.role === "ai" ? "bg-muted text-foreground" : "bg-primary/10 text-primary-foreground border border-primary/20 text-foreground"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<typeof calls[0] | null>(null);

  const filtered = calls.filter((c) => {
    const matchSearch = c.caller.includes(search);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Çağrılar</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Tüm çağrı geçmişi ve transkriptler</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-lg px-3 py-1.5">
          <Phone className="w-3.5 h-3.5" />
          {calls.length} çağrı
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Numara ara..." className="pl-8 h-9 text-sm" />
        </div>
        <div className="flex items-center gap-1.5">
          {["all", "resolved", "escalated", "missed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                statusFilter === s ? "bg-primary/10 text-primary border-primary/20" : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              )}
            >
              {s === "all" ? "Tümü" : statusConfig[s as keyof typeof statusConfig]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Arayan</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tarih</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Süre</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Durum</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Sentiment</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((call) => {
              const cfg = statusConfig[call.status as keyof typeof statusConfig];
              return (
                <tr
                  key={call.id}
                  onClick={() => setSelected(call)}
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <DirectionIcon direction={call.direction} status={call.status} />
                      <span className="text-sm text-foreground font-medium">{call.caller}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span>{call.date}</span>
                      <span className="text-border">·</span>
                      <span>{call.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {call.duration}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn("text-xs", cfg.className)}>{cfg.label}</Badge>
                  </td>
                  <td className="px-4 py-3"><SentimentBar value={call.sentiment} /></td>
                  <td className="px-4 py-3">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Phone className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Çağrı bulunamadı</p>
          </div>
        )}
      </div>

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelected(null)} />
          <CallDetail call={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </div>
  );
}