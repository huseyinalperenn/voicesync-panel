"use client";

import { Phone, PhoneIncoming, PhoneOutgoing, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const calls = [
  { id: 1, phone: "+90 212 555 01 01", agent: "Müşteri Hizmetleri", duration: "3:42", status: "completed", resolved: true, direction: "inbound", time: "2 dk önce" },
  { id: 2, phone: "+90 532 123 45 67", agent: "Müşteri Hizmetleri", duration: "1:18", status: "completed", resolved: false, direction: "outbound", time: "8 dk önce" },
  { id: 3, phone: "+90 216 444 99 00", agent: "Müşteri Hizmetleri", duration: "0:00", status: "missed", resolved: false, direction: "inbound", time: "15 dk önce" },
  { id: 4, phone: "+90 505 876 54 32", agent: "Müşteri Hizmetleri", duration: "5:03", status: "completed", resolved: true, direction: "inbound", time: "22 dk önce" },
  { id: 5, phone: "+90 312 777 22 11", agent: "Müşteri Hizmetleri", duration: "2:55", status: "completed", resolved: true, direction: "outbound", time: "34 dk önce" },
];

const statusConfig = {
  completed: { label: "Tamamlandı", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  missed: { label: "Cevapsız", className: "bg-amber-50 text-amber-600 border-amber-200" },
  failed: { label: "Başarısız", className: "bg-red-50 text-red-500 border-red-200" },
  active: { label: "Aktif", className: "bg-primary/10 text-primary border-primary/20 animate-pulse" },
};

export function RecentCalls() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Son Çağrılar</h3>
          <p className="text-xs text-muted-foreground">En son 5 çağrı</p>
        </div>
        <a href="/calls" className="text-xs text-primary hover:underline">
          Tümünü gör →
        </a>
      </div>
      <div className="divide-y divide-border">
        {calls.map((call) => {
          const status = statusConfig[call.status as keyof typeof statusConfig];
          return (
            <div key={call.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors">
              {/* Direction icon */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                call.direction === "inbound" ? "bg-cyan/10 text-cyan-600" : "bg-primary/10 text-primary"
              )}>
                {call.direction === "inbound"
                  ? <PhoneIncoming className="w-3.5 h-3.5" />
                  : <PhoneOutgoing className="w-3.5 h-3.5" />
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{call.phone}</span>
                  {call.resolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="text-xs text-muted-foreground">{call.agent}</div>
              </div>

              {/* Duration */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {call.duration}
              </div>

              {/* Status */}
              <Badge variant="outline" className={cn("text-[11px] border", status.className)}>
                {status.label}
              </Badge>

              {/* Time */}
              <span className="hidden md:block text-xs text-muted-foreground w-20 text-right">
                {call.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}