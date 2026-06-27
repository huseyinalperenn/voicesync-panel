import { MetricCards } from "@/components/dashboard/metric-cards";
import { CallsChart } from "@/components/dashboard/calls-chart";
import { RecentCalls } from "@/components/dashboard/recent-calls";
import { SignalCore } from "@/components/dashboard/signal-core";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Genel görünüm ve son aktiviteler</p>
      </div>

      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CallsChart />
        </div>
        <div>
          <SignalCore />
        </div>
      </div>

      <RecentCalls />
    </div>
  );
}