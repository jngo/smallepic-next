"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Global array to keep track of window stacking order
const windowStack: Array<React.Dispatch<React.SetStateAction<number>>> = []

// Update z-index for all windows based on their order in the stack
const updateZIndices = () => {
  windowStack.forEach((set, index) => set(10 + index))
}

interface WindowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  onClose?: () => void
}

export interface WindowRef {
  bringToFront: () => void
}

const Window = React.forwardRef<WindowRef, WindowProps>(
  ({ title, className, children, style, onClose, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 100, y: 100 })
    const [zIndex, setZIndex] = React.useState(10) // Start with a fixed value
    const startRef = React.useRef({ x: 0, y: 0 })
    const originRef = React.useRef({ x: 0, y: 0 })
    const idRef = React.useRef<number | null>(null)
    const divRef = React.useRef<HTMLDivElement>(null)

    // Register this window in the stack on mount
    React.useEffect(() => {
      windowStack.push(setZIndex)
      updateZIndices()
      return () => {
        const idx = windowStack.indexOf(setZIndex)
        if (idx !== -1) {
          windowStack.splice(idx, 1)
          updateZIndices()
        }
      }
    }, [])

    // Expose bringToFront method to parent components
    const bringToFront = React.useCallback(() => {
      const idx = windowStack.indexOf(setZIndex)
      if (idx !== -1) {
        windowStack.splice(idx, 1)
        windowStack.push(setZIndex)
        updateZIndices()
      }
    }, [])

    React.useImperativeHandle(ref, () => ({
      bringToFront
    }))

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      idRef.current = e.pointerId
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      startRef.current = { x: e.clientX, y: e.clientY }
      originRef.current = { ...position }
      bringToFront()
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (idRef.current !== e.pointerId) return
      e.preventDefault()
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      setPosition({ x: originRef.current.x + dx, y: originRef.current.y + dy })
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (idRef.current === e.pointerId) {
        e.preventDefault()
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
        idRef.current = null
      }
    }

    return (
      <div
        ref={divRef}
        style={{ left: position.x, top: position.y, zIndex, ...style }}
        className={cn(
          "absolute w-80 rounded-sm border bg-card text-card-foreground shadow-md",
          className
        )}
        onClick={bringToFront}
        {...props}
      >
        <div
          className="flex select-none items-center justify-between gap-2 bg-muted px-2 py-1 text-sm cursor-move touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className="font-semibold">{title}</span>
          <div className="flex gap-1">
            <X
              className="size-3 rounded-full text-muted bg-primary cursor-pointer hover:bg-destructive transition-colors"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    )
  }
)
Window.displayName = "Window"

export { Window }