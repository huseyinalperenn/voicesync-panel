"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const callVolumeData = [
  { day: "1 Haz", total: 312 }, { day: "2 Haz", total: 287 }, { day: "3 Haz", total: 445 },
  { day: "4 Haz", total: 398 }, { day: "5 Haz", total: 521 }, { day: "6 Haz", total: 489 },
  { day: "7 Haz", total: 367 }, { day: "8 Haz", total: 602 }, { day: "9 Haz", total: 578 },
  { day: "10 Haz", total: 634 }, { day: "11 Haz", total: 712 }, { day: "12 Haz", total: 688 },
];

const resolutionData = [
  { day: "1 Haz", rate: 78 }, { day: "2 Haz", rate: 81 }, { day: "3 Haz", rate: 76 },
  { day: "4 Haz", rate: 83 }, { day: "5 Haz", rate: 85 }, { day: "6 Haz", rate: 82 },
  { day: "7 Haz", rate: 79 }, { day: "8 Haz", rate: 88 }, { day: "9 Haz", rate: 86 },
  { day: "10 Haz", rate: 91 }, { day: "11 Haz", rate: 89 }, { day: "12 Haz", rate: 93 },
];

const tenantUsageData = [
  { name: "ACME Corp", calls: 1847, color: "#8B6DE5" },
  { name: "Megastore Ltd.", calls: 1432, color: "#35A6A8" },
  { name: "Ankara Sağlık", calls: 987, color: "#568FC8" },
  { name: "TechStart A.Ş.", calls: 543, color: "#A064C6" },
  { name: "Diğer", calls: 312, color: "#45DFEE" },
];

const heatmap = [
  [12, 8, 5, 3, 2, 4, 18, 45, 72, 88, 95, 89, 102, 98, 87, 76, 68, 72, 84, 91, 78, 54, 32, 18],
  [9, 6, 4, 2, 2, 5, 22, 48, 68, 82, 91, 95, 108, 102, 89, 78, 71, 75, 88, 94, 72, 48, 28, 14],
  [15, 10, 6, 4, 3, 6, 19, 42, 65, 79, 88, 92, 98, 94, 82, 74, 65, 68, 79, 86, 69, 44, 25, 12],
  [18, 12, 8, 5, 3, 7, 24, 51, 74, 86, 94, 99, 112, 108, 95, 84, 76, 80, 92, 98, 81, 56, 32, 16],
  [22, 15, 9, 5, 3, 8, 28, 55, 78, 92, 98, 104, 118, 114, 98, 86, 78, 82, 96, 104, 85, 58, 34, 18],
  [42, 28, 18, 11, 7, 9, 32, 58, 82, 96, 102, 108, 122, 116, 102, 88, 80, 84, 98, 106, 88, 62, 38, 22],
  [38, 25, 15, 8, 5, 8, 28, 52, 76, 88, 94, 100, 112, 108, 95, 82, 74, 78, 90, 98, 82, 55, 32, 18],
];

const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

function HeatCell({ value }: { value: number }) {
  const max = 125;
  const ratio = value / max;
  const opacity = 0.08 + ratio * 0.72;
  const color = ratio > 0.7 ? "#8B6DE5" : ratio > 0.4 ? "#35A6A8" : "#568FC8";
  return (
    <div
      className="w-full aspect-square rounded-[2px]"
      style={{ backgroundColor: color, opacity }}
      title={`${value} çağrı`}
    />
  );
}

export default function AdminAnalyticsPage() {
  const totalCalls = callVolumeData.reduce((s, d) => s + d.total, 0);
  const avgResolution = Math.round(resolutionData.reduce((s, d) => s + d.rate, 0) / resolutionData.length);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Platform Analitik</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Tüm tenant'lar geneli platform istatistikleri</p>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Toplam Çağrı (12g)", value: totalCalls.toLocaleString("tr-TR"), color: "#8B6DE5" },
          { label: "Ort. Çözüm Oranı", value: `${avgResolution}%`, color: "#35A6A8" },
          { label: "Aktif Tenant", value: "5", color: "#568FC8" },
          { label: "Ort. Çağrı Süresi", value: "4:18", color: "#A064C6" },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-xl border border-white/10 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{m.label}</p>
            <p className="text-3xl font-semibold mt-1" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Günlük Çağrı Hacmi</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={callVolumeData}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6DE5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B6DE5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="total" stroke="#8B6DE5" strokeWidth={2} fill="url(#ag1)" name="Çağrı" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Çözüm Oranı Trendi (%)</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={2} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="rate" stroke="#35A6A8" strokeWidth={2} dot={false} name="Çözüm %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tenant usage + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Tenant Kullanım Dağılımı</p>
          <div className="space-y-3">
            {tenantUsageData.map((t) => {
              const max = tenantUsageData[0].calls;
              const pct = Math.round((t.calls / max) * 100);
              return (
                <div key={t.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{t.name}</span>
                    <span className="text-muted-foreground">{t.calls.toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: t.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Yoğunluk Haritası (Gün × Saat)</p>
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">
              <div className="grid mb-1" style={{ gridTemplateColumns: `32px repeat(24, 1fr)` }}>
                <div />
                {hours.map((h) => (
                  <p key={h} className="text-[8px] text-muted-foreground text-center">{h}</p>
                ))}
              </div>
              {heatmap.map((row, di) => (
                <div key={di} className="grid items-center" style={{ gridTemplateColumns: `32px repeat(24, 1fr)`, gap: "2px", marginBottom: "2px" }}>
                  <p className="text-[9px] text-muted-foreground text-right pr-1">{days[di]}</p>
                  {row.map((val, hi) => <HeatCell key={hi} value={val} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}