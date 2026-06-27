"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Topbar({ title }: { title?: string }) {
  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center gap-4 px-6 sticky top-0 z-30">
      {title && (
        <h1 className="text-sm font-semibold text-foreground mr-auto">{title}</h1>
      )}
      {!title && <div className="flex-1" />}

      <div className="relative hidden md:block">
        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          placeholder="Ara..."
          className="pl-8 h-8 w-52 text-sm bg-muted/50 border-0"
        />
      </div>

      <Button variant="ghost" size="icon" className="relative w-8 h-8">
        <Bell className="w-4 h-4" />
        <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-primary">
          3
        </Badge>
      </Button>

      <Avatar className="w-7 h-7">
        <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
          AC
        </AvatarFallback>
      </Avatar>
    </header>
  );
}