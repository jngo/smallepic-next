"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

let zIndexCounter = 10

interface WindowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
}

const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  ({ title, className, children, style, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 100, y: 100 })
    const [zIndex, setZIndex] = React.useState(() => ++zIndexCounter)
    const startRef = React.useRef({ x: 0, y: 0 })
    const originRef = React.useRef({ x: 0, y: 0 })
    const idRef = React.useRef<number | null>(null)

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      idRef.current = e.pointerId
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      startRef.current = { x: e.clientX, y: e.clientY }
      originRef.current = { ...position }
      setZIndex(++zIndexCounter)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (idRef.current !== e.pointerId) return
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      setPosition({ x: originRef.current.x + dx, y: originRef.current.y + dy })
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (idRef.current === e.pointerId) {
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
        idRef.current = null
      }
    }

    return (
      <div
        ref={ref}
        style={{ left: position.x, top: position.y, zIndex, ...style }}
        className={cn(
          "absolute w-80 rounded-sm border bg-card text-card-foreground shadow-md",
          className
        )}
        {...props}
      >
        <div
          className="flex select-none items-center justify-between gap-2 bg-muted px-2 py-1 text-sm cursor-move"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className="font-semibold">{title}</span>
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-destructive" />
            <span className="size-2 rounded-full bg-secondary" />
            <span className="size-2 rounded-full bg-primary" />
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    )
  }
)
Window.displayName = "Window"

export { Window }

