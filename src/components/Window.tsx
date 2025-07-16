"use client"

import { useState, useRef, useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface WindowProps {
  title: string
  children: ReactNode
  className?: string
  onClose?: () => void
  onFocus?: () => void
  initialPosition?: { x: number; y: number }
  zIndex?: number
}

export default function Window({
  title,
  children,
  className,
  onClose,
  onFocus,
  initialPosition = { x: 50, y: 50 },
  zIndex = 1
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).closest('.window-title-bar')) {
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
      onFocus?.()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute bg-gray-200 border-2 border-gray-400 shadow-lg select-none",
        "border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500",
        className
      )}
      style={{
        left: position.x,
        top: position.y,
        zIndex
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="window-title-bar bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 cursor-move flex items-center justify-between">
        <span className="text-sm font-medium truncate flex-1">{title}</span>
        <div className="flex items-center space-x-1 ml-2">
          {/* Window Controls */}
          <button
            className="w-4 h-4 bg-gray-300 border border-gray-400 hover:bg-gray-400 text-xs font-bold text-gray-700 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
              // Minimize functionality could be added here
            }}
            aria-label="Minimize"
          >
            −
          </button>
          <button
            className="w-4 h-4 bg-gray-300 border border-gray-400 hover:bg-gray-400 text-xs font-bold text-gray-700 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
              // Maximize functionality could be added here
            }}
            aria-label="Maximize"
          >
            □
          </button>
          {onClose && (
            <button
              className="w-4 h-4 bg-red-500 border border-red-600 hover:bg-red-600 text-xs font-bold text-white flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-gray-100 border-t border-gray-300 p-2 min-h-[100px]">
        {children}
      </div>
    </div>
  )
}