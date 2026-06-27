import { CommandMetrics } from "@/components/dashboard/command-metrics";
import { SystemChart } from "@/components/dashboard/system-chart";
import { TenantGrid } from "@/components/dashboard/tenant-grid";

export default function CommandCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Command Center</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Sistem geneli durum ve istatistikler</p>
      </div>

      <CommandMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemChart />
        <TenantGrid />
      </div>
    </div>
  );
}
