"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { date: "4 Haz", calls: 820, minutes: 180 },
  { date: "5 Haz", calls: 932, minutes: 210 },
  { date: "6 Haz", calls: 754, minutes: 162 },
  { date: "7 Haz", calls: 1102, minutes: 241 },
  { date: "8 Haz", calls: 876, minutes: 195 },
  { date: "9 Haz", calls: 1245, minutes: 278 },
  { date: "10 Haz", calls: 1089, minutes: 234 },
];

export function SystemChart() {
  return (
    <div className="glass-card rounded-xl border border-white/8 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Platform Çağrı Hacmi</h3>
        <p className="text-xs text-muted-foreground">Son 7 gün — tüm tenantlar</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7751FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7751FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="minutesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#21CBDA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#21CBDA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "#1C1A24",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#E6E0EE" }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
          <Area type="monotone" dataKey="calls" name="Çağrılar" stroke="#7751FF" strokeWidth={2} fill="url(#callsGrad)" dot={false} />
          <Area type="monotone" dataKey="minutes" name="Dakikalar" stroke="#21CBDA" strokeWidth={2} fill="url(#minutesGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}