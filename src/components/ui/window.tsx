"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Global window management system using an array-based approach
class WindowManager {
  private static instance: WindowManager
  private windowStack: string[] = []
  private listeners: Map<string, (zIndex: number) => void> = new Map()
  private focusListeners: Map<string, (isFocused: boolean) => void> = new Map()
  private focusedWindow: string | null = null
  private baseZIndex = 10

  static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager()
    }
    return WindowManager.instance
  }

  registerWindow(windowId: string, zIndexCallback: (zIndex: number) => void, focusCallback: (isFocused: boolean) => void): void {
    this.listeners.set(windowId, zIndexCallback)
    this.focusListeners.set(windowId, focusCallback)
    // Add to stack if not already present
    if (!this.windowStack.includes(windowId)) {
      this.windowStack.push(windowId)
      this.updateZIndices()
      // Focus the newly created window
      this.setFocusedWindow(windowId)
    }
  }

  unregisterWindow(windowId: string): void {
    this.listeners.delete(windowId)
    this.focusListeners.delete(windowId)
    const index = this.windowStack.indexOf(windowId)
    if (index > -1) {
      this.windowStack.splice(index, 1)
      this.updateZIndices()
      // If the focused window was removed, focus the top window
      if (this.focusedWindow === windowId) {
        const topWindow = this.windowStack[this.windowStack.length - 1]
        this.setFocusedWindow(topWindow || null)
      }
    }
  }

  bringToFront(windowId: string): void {
    const index = this.windowStack.indexOf(windowId)
    if (index > -1) {
      // Remove from current position and add to end (top of stack)
      this.windowStack.splice(index, 1)
      this.windowStack.push(windowId)
      this.updateZIndices()
      this.setFocusedWindow(windowId)
    }
  }

  private setFocusedWindow(windowId: string | null): void {
    if (this.focusedWindow === windowId) return
    
    // Update previous focused window
    if (this.focusedWindow) {
      const prevFocusCallback = this.focusListeners.get(this.focusedWindow)
      if (prevFocusCallback) {
        prevFocusCallback(false)
      }
    }
    
    // Update new focused window
    this.focusedWindow = windowId
    if (windowId) {
      const newFocusCallback = this.focusListeners.get(windowId)
      if (newFocusCallback) {
        newFocusCallback(true)
      }
    }
  }

  private updateZIndices(): void {
    this.windowStack.forEach((windowId, index) => {
      const callback = this.listeners.get(windowId)
      if (callback) {
        callback(this.baseZIndex + index)
      }
    })
  }
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
    const [zIndex, setZIndex] = React.useState(10)
    const [isFocused, setIsFocused] = React.useState(false)
    const startRef = React.useRef({ x: 0, y: 0 })
    const originRef = React.useRef({ x: 0, y: 0 })
    const idRef = React.useRef<number | null>(null)
    const divRef = React.useRef<HTMLDivElement>(null)
    const windowIdRef = React.useRef<string>(`window-${Math.random().toString(36).substr(2, 9)}`)
    const windowManager = WindowManager.getInstance()

    // Register window with the manager and set up z-index and focus callbacks
    React.useEffect(() => {
      const windowId = windowIdRef.current
      windowManager.registerWindow(windowId, setZIndex, setIsFocused)
      
      return () => {
        windowManager.unregisterWindow(windowId)
      }
    }, [windowManager])

    // Expose bringToFront method to parent components
    React.useImperativeHandle(ref, () => ({
      bringToFront: () => {
        windowManager.bringToFront(windowIdRef.current)
      }
    }))

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      idRef.current = e.pointerId
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      startRef.current = { x: e.clientX, y: e.clientY }
      originRef.current = { ...position }
      windowManager.bringToFront(windowIdRef.current)
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
        onClick={() => windowManager.bringToFront(windowIdRef.current)}
        {...props}
      >
        <div
          className={cn(
            "flex select-none items-center justify-between gap-2 px-2 py-1 text-sm cursor-move touch-none",
            isFocused 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-foreground"
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