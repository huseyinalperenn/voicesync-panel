"use client";

import { Phone, Clock, TrendingUp, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    label: "Toplam Çağrı",
    value: "1,248",
    change: "+12%",
    positive: true,
    icon: Phone,
    color: "metric-purple",
  },
  {
    label: "Toplam Dakika",
    value: "342",
    change: "+8%",
    positive: true,
    icon: Clock,
    color: "metric-turquoise",
  },
  {
    label: "Ort. Süre",
    value: "2:14",
    change: "-3%",
    positive: false,
    icon: TrendingUp,
    color: "metric-blue",
  },
  {
    label: "Çözüm Oranı",
    value: "87.4%",
    change: "+2.1%",
    positive: true,
    icon: CheckCircle2,
    color: "metric-lilac",
  },
];

const colorMap: Record<string, string> = {
  "metric-purple": "text-[var(--metric-purple)] bg-[var(--metric-purple)]/10",
  "metric-turquoise": "text-[var(--metric-turquoise)] bg-[var(--metric-turquoise)]/10",
  "metric-blue": "text-[var(--metric-blue)] bg-[var(--metric-blue)]/10",
  "metric-lilac": "text-[var(--metric-lilac)] bg-[var(--metric-lilac)]/10",
};

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="card-hover-lift rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorMap[m.color])}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground">{m.value}</span>
              <span
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded",
                  m.positive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-red-500 bg-red-50"
                )}
              >
                {m.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}