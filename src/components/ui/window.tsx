"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Grid3x3, List } from "lucide-react"

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

// Context for managing view state within a window
interface WindowContextValue {
  activeView: string
  setActiveView: (view: string) => void
  availableViews: string[]
  focused: boolean
}

const WindowContext = React.createContext<WindowContextValue | null>(null)

const useWindowContext = () => {
  const context = React.useContext(WindowContext)
  if (!context) {
    throw new Error('Window compound components must be used within a Window')
  }
  return context
}

// Main Window component props
interface WindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  onClose?: () => void
  defaultView?: string
  viewSizes?: Record<string, string>
}

export interface WindowRef {
  bringToFront: () => void
}

const Window = React.forwardRef<WindowRef, WindowProps>(
  ({ className, children, style, onClose, defaultView, viewSizes, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 100, y: 100 })
    const [zIndex, setZIndex] = React.useState(10)
    const [focused, setFocused] = React.useState(false)
    const [dragging, setDragging] = React.useState(false)
    const startRef = React.useRef({ x: 0, y: 0 })
    const originRef = React.useRef({ x: 0, y: 0 })
    const idRef = React.useRef<number | null>(null)

    // Extract available views from WindowContent children
    const availableViews = React.useMemo(() => {
      const views: string[] = []
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === WindowContent) {
          // If no view prop is provided, it's a single view window
          const view = (child.props as WindowContentProps).view || 'default'
          views.push(view)
        }
      })
      return views
    }, [children])

    const [activeView, setActiveView] = React.useState(
      defaultView || availableViews[0] || 'default'
    )

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
      setDragging(true)
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
        setDragging(false)
      }
    }

    // Get dynamic width based on active view
    const currentViewSize = viewSizes?.[activeView] || 'w-80'

    return (
      <div
        style={{ left: position.x, top: position.y, zIndex, ...style }}
        className={cn(
          "absolute max-w-[90svw] max-h-[90svh] flex flex-col rounded-sm border bg-card text-card-foreground shadow-md",
          currentViewSize,
          className
        )}
        onClick={bringToFront}
        {...props}
      >
        <WindowContext.Provider value={{ activeView, setActiveView, availableViews, focused }}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === WindowTitle) {
              return React.cloneElement(child, {
                onPointerDown,
                onPointerMove,
                onPointerUp,
                onClose,
                dragging,
              } as WindowTitleProps)
            }
            return child
          })}
        </WindowContext.Provider>
      </div>
    )
  }
)
Window.displayName = "Window"

// WindowTitle component - renders title bar with automatic view toggles
interface WindowTitleProps {
  children: React.ReactNode
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void
  onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void
  onClose?: () => void
  dragging?: boolean
}

const WindowTitle: React.FC<WindowTitleProps> = ({
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onClose,
  dragging
}) => {
  const { activeView, setActiveView, availableViews, focused } = useWindowContext()

  const getViewIcon = (view: string) => {
    switch (view) {
      case 'icon':
        return Grid3x3
      case 'list':
        return List
      default:
        return List
    }
  }

  return (
    <div
      className={cn(
        "relative flex select-none items-center justify-between h-8 px-2 py-1.5 text-sm touch-none",
        dragging ? "cursor-grabbing" : "cursor-grab",
        focused ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Left: Close button */}
      <div className="flex items-center justify-start">
        <button
          className="p-2 -m-2 group"
          onClick={onClose}
          aria-label="Close"
        >
          <X className={cn(
            "size-3 rounded-full group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors",
            focused ? "bg-input text-primary" : "bg-input text-foreground"
            )} />
        </button>
      </div>
      {/* Center: Title - absolutely positioned */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none">
        <span className="font-semibold">{children}</span>
      </div>
      {/* Right: View buttons */}
      <div className="flex items-center justify-end">
        {availableViews.length > 1 && (
          <div className="flex gap-0.5">
            {availableViews.map((view) => {
              const IconComponent = getViewIcon(view)
              return (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={cn(
                    "p-1 rounded-[0.25rem] transition-colors",
                    activeView === view
                      ? focused
                        ? "bg-input text-primary"
                        : "bg-input text-foreground"
                      : focused
                        ? "text-primary-foreground hover:bg-background/20"
                        : "text-foreground hover:bg-input/40"
                  )}
                  aria-label={`${view} view`}
                >
                  <IconComponent className="size-3"  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// WindowContent component - renders content for specific view
interface WindowContentProps extends React.HTMLAttributes<HTMLDivElement> {
  view?: string
  children: React.ReactNode
}

const WindowContent: React.FC<WindowContentProps> = ({ view = 'default', children, className, ...props }) => {
  const { activeView } = useWindowContext()

  if (activeView !== view) {
    return null
  }

  return (
    <div className={cn("flex-1 h-full p-2 overflow-y-auto", className)} {...props}>
      {children}
    </div>
  )
}

export { Window, WindowTitle, WindowContent }