"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ClockProps {
  className?: string;
}

interface WindowWithMinuteInterval extends Window {
  _minuteInterval?: ReturnType<typeof setInterval>;
}

export default function Clock({ className }: ClockProps) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const msUntilNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      update();
      const interval = setInterval(update, 60000);
      (window as WindowWithMinuteInterval)._minuteInterval = interval;
    }, msUntilNextMinute);
    return () => {
      clearTimeout(timeout);
      if ((window as WindowWithMinuteInterval)._minuteInterval) clearInterval((window as WindowWithMinuteInterval)._minuteInterval);
    };
  }, []);

  return (
    <span className={cn("text-sm font-medium text-accent-foreground select-none", className)}>
      {time}
    </span>
  );
} 