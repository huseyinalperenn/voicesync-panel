"use client";

import { Building2, Users, Phone, Clock, Activity, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Toplam Tenant", value: "24", sub: "22 aktif", icon: Building2, glow: "signal-glow" },
  { label: "Aktif Kullanıcı", value: "156", sub: "+3 bu hafta", icon: Users, glow: "" },
  { label: "Toplam Çağrı", value: "48,291", sub: "+12% bu ay", icon: Phone, glow: "cyan-glow" },
  { label: "Toplam Dakika", value: "9,840", sub: "dakika konuşma", icon: Clock, glow: "" },
  { label: "Çözüm Oranı", value: "89.2%", sub: "platform geneli", icon: TrendingUp, glow: "signal-glow" },
  { label: "Sistem Yükü", value: "23%", sub: "normal seviye", icon: Activity, glow: "" },
];

export function CommandMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="glass-card rounded-xl p-4 space-y-2 border border-white/8"
          >
            <div className="flex items-center justify-between">
              <div className={cn("w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center", m.glow)}>
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">{m.value}</div>
              <div className="text-[11px] text-muted-foreground">{m.label}</div>
              <div className="text-[10px] text-muted-foreground/60 mt-0.5">{m.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}