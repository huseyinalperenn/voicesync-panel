"use client";

import { BarChart3, TrendingUp, Clock, MessageSquare } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const callVolume = [
  { day: "1 Haz", calls: 45 },
  { day: "2 Haz", calls: 52 },
  { day: "3 Haz", calls: 38 },
  { day: "4 Haz", calls: 61 },
  { day: "5 Haz", calls: 55 },
  { day: "6 Haz", calls: 43 },
  { day: "7 Haz", calls: 70 },
  { day: "8 Haz", calls: 65 },
  { day: "9 Haz", calls: 58 },
  { day: "10 Haz", calls: 72 },
];

const resolutionTrend = [
  { day: "1 Haz", rate: 78 },
  { day: "2 Haz", rate: 82 },
  { day: "3 Haz", rate: 75 },
  { day: "4 Haz", rate: 88 },
  { day: "5 Haz", rate: 85 },
  { day: "6 Haz", rate: 80 },
  { day: "7 Haz", rate: 91 },
  { day: "8 Haz", rate: 87 },
  { day: "9 Haz", rate: 89 },
  { day: "10 Haz", rate: 93 },
];

const hourHeatmap = [
  { hour: "08", mon: 3, tue: 5, wed: 4, thu: 6, fri: 8 },
  { hour: "09", mon: 12, tue: 15, wed: 11, thu: 18, fri: 20 },
  { hour: "10", mon: 18, tue: 22, wed: 19, thu: 25, fri: 24 },
  { hour: "11", mon: 15, tue: 19, wed: 16, thu: 21, fri: 18 },
  { hour: "12", mon: 8, tue: 10, wed: 9, thu: 12, fri: 11 },
  { hour: "13", mon: 10, tue: 14, wed: 12, thu: 16, fri: 15 },
  { hour: "14", mon: 20, tue: 24, wed: 22, thu: 28, fri: 26 },
  { hour: "15", mon: 22, tue: 26, wed: 23, thu: 30, fri: 27 },
  { hour: "16", mon: 16, tue: 18, wed: 17, thu: 20, fri: 19 },
  { hour: "17", mon: 9, tue: 11, wed: 10, thu: 13, fri: 12 },
];

const topTopics = [
  { topic: "Sipariş takibi", count: 145, pct: 28 },
  { topic: "İade ve değişim", count: 98, pct: 19 },
  { topic: "Ürün bilgisi", count: 87, pct: 17 },
  { topic: "Teknik destek", count: 72, pct: 14 },
  { topic: "Fatura sorgusu", count: 61, pct: 12 },
  { topic: "Diğer", count: 52, pct: 10 },
];

const sentimentDist = [
  { label: "Pozitif", value: 62, color: "#35A6A8" },
  { label: "Nötr", value: 25, color: "#568FC8" },
  { label: "Negatif", value: 13, color: "#A064C6" },
];

function MetricCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</p>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Analitik</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Bu ayki performans verileri</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={BarChart3} label="Toplam Çağrı" value="559" sub="+12% geçen ay" color="#8B6DE5" />
        <MetricCard icon={TrendingUp} label="Çözüm Oranı" value="87%" sub="+5pp geçen ay" color="#35A6A8" />
        <MetricCard icon={Clock} label="Ort. Süre" value="4:12" sub="-0:18 geçen ay" color="#568FC8" />
        <MetricCard icon={MessageSquare} label="RAG Sorgusu" value="1,247" sub="Bu ay" color="#A064C6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Call Volume */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Çağrı Hacmi</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={callVolume}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6DE5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B6DE5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="calls" stroke="#8B6DE5" strokeWidth={2} fill="url(#cg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Rate */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Çözüm Oranı Trendi (%)</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={resolutionTrend}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#35A6A8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#35A6A8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="rate" stroke="#35A6A8" strokeWidth={2} fill="url(#rg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Topics */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">En Çok Sorulan Konular</p>
          <div className="space-y-2.5">
            {topTopics.map((t) => (
              <div key={t.topic} className="flex items-center gap-3">
                <span className="text-sm text-foreground w-36 truncate flex-shrink-0">{t.topic}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/60 rounded-full" style={{ width: `${t.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right flex-shrink-0">{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Sentiment Dağılımı</p>
          <div className="space-y-3">
            {sentimentDist.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{s.label}</span>
                  <span className="text-sm font-medium text-foreground">{s.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">559 çağrı analiz edildi</p>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">En Yoğun Saatler</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground font-medium pr-3 pb-2">Saat</th>
                {["Pzt", "Sal", "Çar", "Per", "Cum"].map(d => (
                  <th key={d} className="text-center text-muted-foreground font-medium px-2 pb-2">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hourHeatmap.map((row) => {
                const vals = [row.mon, row.tue, row.wed, row.thu, row.fri];
                const max = Math.max(...vals);
                return (
                  <tr key={row.hour}>
                    <td className="text-muted-foreground pr-3 py-1">{row.hour}:00</td>
                    {vals.map((v, i) => (
                      <td key={i} className="px-2 py-1 text-center">
                        <div
                          className="inline-block w-8 h-6 rounded text-[10px] font-medium flex items-center justify-center"
                          style={{
                            backgroundColor: `rgba(107,63,255,${(v / max) * 0.7})`,
                            color: v / max > 0.5 ? "white" : "var(--foreground)"
                          }}
                        >
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}