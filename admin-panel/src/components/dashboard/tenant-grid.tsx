"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tenants = [
  { name: "Acme Corp", plan: "enterprise", status: "active", calls: 12840, usage: 84 },
  { name: "TechStart", plan: "pro", status: "active", calls: 3201, usage: 32 },
  { name: "RetailPlus", plan: "pro", status: "active", calls: 8762, usage: 88 },
  { name: "FinanceHub", plan: "starter", status: "trial", calls: 421, usage: 42 },
  { name: "LogiFlow", plan: "pro", status: "suspended", calls: 0, usage: 0 },
];

const planColors: Record<string, string> = {
  enterprise: "text-[var(--primary)] bg-[var(--primary)]/15 border-[var(--primary)]/30",
  pro: "text-[var(--cyan)] bg-[var(--cyan)]/10 border-[var(--cyan)]/20",
  starter: "text-muted-foreground bg-white/5 border-white/10",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  trial: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  suspended: "bg-red-500/15 text-red-400 border-red-500/25",
};

export function TenantGrid() {
  return (
    <div className="glass-card rounded-xl border border-white/8 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <h3 className="text-sm font-semibold text-foreground">Tenant Durumu</h3>
        <a href="/tenants" className="text-xs text-primary hover:text-primary/80">Tümü →</a>
      </div>
      <div className="divide-y divide-white/5">
        {tenants.map((t) => (
          <div key={t.name} className="flex items-center gap-3 px-5 py-3 hover:bg-white/3 transition-colors">
            <div className="w-7 h-7 rounded-md bg-primary/15 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-primary">{t.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate">{t.name}</span>
                <Badge variant="outline" className={cn("text-[10px] border px-1.5 py-0 h-4", planColors[t.plan])}>
                  {t.plan}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-primary/60"
                    style={{ width: `${t.usage}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-8 text-right">{t.usage}%</span>
              </div>
            </div>
            <Badge variant="outline" className={cn("text-[10px] border px-1.5 py-0 h-4 flex-shrink-0", statusColors[t.status])}>
              {t.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}