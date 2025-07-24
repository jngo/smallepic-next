"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ClockProps {
  className?: string;
}

export default function Clock({ className }: ClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const msUntilNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      update();
    }, msUntilNextMinute);
    return () => {
      clearTimeout(timeout);
      // Optionally clear interval if stored
    };
  }, []);

  if (!time) return null;

  return (
    <span className={cn("text-sm font-medium text-accent-foreground select-none", className)}>
      {time}
    </span>
  );
} 