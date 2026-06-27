"use client";

import { cn } from "@/lib/utils";

export function SignalCore() {
  const activeCallsCount = 3;

  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Canlı Durum</h3>
        <p className="text-xs text-muted-foreground">Aktif çağrılar</p>
      </div>

      {/* Signal core visual */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Orbit rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20 animate-ping"
              style={{
                width: `${i * 48}px`,
                height: `${i * 48}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
          {/* Core */}
          <div className="relative w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">{activeCallsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-lg font-bold text-foreground">3</div>
          <div className="text-[11px] text-muted-foreground">Aktif</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-lg font-bold text-foreground">1,248</div>
          <div className="text-[11px] text-muted-foreground">Bu ay</div>
        </div>
      </div>
    </div>
  );
}