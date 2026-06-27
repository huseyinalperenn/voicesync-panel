"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Phone,
  Activity,
  BarChart3,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Satellite,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/tenants", label: "Tenant Yönetimi", icon: Building2 },
  { href: "/users", label: "Kullanıcı Yönetimi", icon: Users },
  { href: "/calls", label: "Çağrı Merkezi", icon: Phone },
  { href: "/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/revenue", label: "Gelir & Faturalama", icon: DollarSign },
  { href: "/system", label: "Sistem İstatistikleri", icon: Activity },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "relative flex flex-col h-full border-r border-border transition-all duration-300",
          "bg-[var(--surface-container)]",
          collapsed ? "w-[60px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-2.5 px-4 py-5 border-b border-border",
          collapsed && "justify-center px-0"
        )}>
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center signal-glow">
            <Satellite className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-semibold text-sm text-foreground">Orbital</span>
              <p className="text-[10px] text-muted-foreground leading-tight">Command Center</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  "hover:bg-white/5 hover:text-foreground",
                  active
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground border border-transparent",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </nav>

        {/* System status */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse signal-glow" />
              <span className="text-[11px] text-muted-foreground">Tüm sistemler normal</span>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-5 w-6 h-6 rounded-full border border-border bg-[var(--surface-container)] shadow-sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </aside>
    </TooltipProvider>
  );
}