"use client";

import { Activity, Cpu, HardDrive, Wifi, Server, AlertCircle, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cpuData = [
  { t: "09:00", v: 32 }, { t: "09:10", v: 45 }, { t: "09:20", v: 38 }, { t: "09:30", v: 62 },
  { t: "09:40", v: 55 }, { t: "09:50", v: 48 }, { t: "10:00", v: 71 }, { t: "10:10", v: 65 },
  { t: "10:20", v: 58 }, { t: "10:30", v: 42 },
];

const ramData = [
  { t: "09:00", v: 54 }, { t: "09:10", v: 56 }, { t: "09:20", v: 58 }, { t: "09:30", v: 61 },
  { t: "09:40", v: 60 }, { t: "09:50", v: 63 }, { t: "10:00", v: 65 }, { t: "10:10", v: 64 },
  { t: "10:20", v: 67 }, { t: "10:30", v: 66 },
];

const services = [
  { name: "API Gateway", status: "operational", latency: "12ms", uptime: "99.98%" },
  { name: "Voice Engine", status: "operational", latency: "45ms", uptime: "99.95%" },
  { name: "RAG Service", status: "operational", latency: "120ms", uptime: "99.90%" },
  { name: "SIP Proxy", status: "operational", latency: "8ms", uptime: "99.99%" },
  { name: "Auth Service", status: "degraded", latency: "280ms", uptime: "99.82%" },
  { name: "Analytics Pipeline", status: "operational", latency: "55ms", uptime: "99.97%" },
];

function GaugeRing({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = (value / 100) * 0.75;
  const dash = pct * circ;
  const gap = circ - dash;
  const offset = circ * 0.125;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-135deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeDashoffset={-offset} strokeLinecap="round" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${dash} ${gap + circ * 0.25}`} strokeDashoffset={-offset} strokeLinecap="round" />
    </svg>
  );
}

function MetricGauge({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col items-center">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">{label}</p>
      <div className="relative">
        <GaugeRing value={value} color={color} size={88} />
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginTop: 4 }}>
          <span className="text-xl font-semibold text-foreground">{value}</span>
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function SystemPage() {
  const operational = services.filter(s => s.status === "operational").length;
  const degraded = services.filter(s => s.status === "degraded").length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Sistem İstatistikleri</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Altyapı sağlığı ve performans</p>
      </div>

      {/* Status banner */}
      <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${degraded > 0 ? "border-amber-500/20 bg-amber-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}>
        {degraded > 0 ? (
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
        ) : (
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        )}
        <p className="text-sm font-medium text-foreground">
          {degraded > 0 ? `${degraded} servis performans sorunu yaşıyor` : "Tüm sistemler nominal"}
        </p>
        <span className="ml-auto text-xs text-muted-foreground">{operational}/{services.length} servis aktif</span>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricGauge label="CPU" value={42} unit="%" color="#8B6DE5" />
        <MetricGauge label="RAM" value={66} unit="%" color="#35A6A8" />
        <MetricGauge label="Disk" value={38} unit="%" color="#568FC8" />
        <MetricGauge label="Ağ" value={24} unit="Mbps" color="#A064C6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">CPU Kullanımı (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={cpuData}>
              <defs>
                <linearGradient id="cpug" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B6DE5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B6DE5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="#8B6DE5" strokeWidth={2} fill="url(#cpug)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">RAM Kullanımı (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ramData}>
              <defs>
                <linearGradient id="ramg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#35A6A8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#35A6A8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="#35A6A8" strokeWidth={2} fill="url(#ramg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Services */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 bg-white/3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Servis Durumu</p>
        </div>
        <div className="divide-y divide-white/8">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === "operational" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"}`} />
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">{s.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span>Gecikme: <span className="text-foreground">{s.latency}</span></span>
                <span>Uptime: <span className="text-foreground">{s.uptime}</span></span>
                <span className={`font-medium ${s.status === "operational" ? "text-emerald-400" : "text-amber-400"}`}>
                  {s.status === "operational" ? "Çalışıyor" : "Yavaş"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}