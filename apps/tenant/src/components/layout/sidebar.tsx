"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  Bot,
  BookOpen,
  BarChart3,
  CreditCard,
  Settings,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calls", label: "Çağrılar", icon: Phone },
  { href: "/agents", label: "Ajan Konfigürasyonu", icon: Bot },
  { href: "/knowledge-base", label: "Bilgi Tabanı", icon: BookOpen },
  { href: "/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/billing", label: "Faturalama", icon: CreditCard, badge: "Pro" },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "relative flex flex-col h-full border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-[60px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center gap-2 px-4 py-5 border-b border-border", collapsed && "justify-center px-0")}>
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Waves className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-semibold text-sm text-foreground">VoiceSync</span>
              <p className="text-[10px] text-muted-foreground leading-tight">Tenant Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
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

        {/* Live indicator */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistem çevrimiçi</span>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-5 w-6 h-6 rounded-full border border-border bg-background shadow-sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </aside>
    </TooltipProvider>
  );
}