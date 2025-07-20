"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Track window order and focus state for all windows
interface StackEntry {
  setZIndex: React.Dispatch<React.SetStateAction<number>>
  setFocused: React.Dispatch<React.SetStateAction<boolean>>
}

const windowStack: StackEntry[] = []

// Update z-indices and focus flags for every window based on stack order
const updateZIndices = () => {
  windowStack.forEach(({ setZIndex, setFocused }, index) => {
    setZIndex(10 + index)
    setFocused(index === windowStack.length - 1)
  })
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
    const [focused, setFocused] = React.useState(false)
    const startRef = React.useRef({ x: 0, y: 0 })
    const originRef = React.useRef({ x: 0, y: 0 })
    const idRef = React.useRef<number | null>(null)
    const divRef = React.useRef<HTMLDivElement>(null)

    // Register this window in the stack on mount
    React.useEffect(() => {
      const entry: StackEntry = { setZIndex, setFocused }
      windowStack.push(entry)
      updateZIndices()
      return () => {
        const idx = windowStack.indexOf(entry)
        if (idx !== -1) {
          windowStack.splice(idx, 1)
          updateZIndices()
        }
      }
    }, [])

    // Expose bringToFront method to parent components
    const bringToFront = React.useCallback(() => {
      const idx = windowStack.findIndex((w) => w.setZIndex === setZIndex)
      if (idx !== -1) {
        const [entry] = windowStack.splice(idx, 1)
        windowStack.push(entry)
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
          className={cn(
            "flex select-none items-center justify-between gap-2 px-2 py-1 text-sm cursor-move touch-none",
            focused ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          )}
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