import { useState, useCallback } from 'react'

export interface WindowState {
  id: string
  zIndex: number
  isVisible: boolean
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [highestZIndex, setHighestZIndex] = useState(1)

  const addWindow = useCallback((id: string) => {
    setWindows(prev => {
      if (prev.find(w => w.id === id)) return prev
      return [...prev, { id, zIndex: highestZIndex + 1, isVisible: true }]
    })
    setHighestZIndex(prev => prev + 1)
  }, [highestZIndex])

  const removeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id)
      if (!window) return prev
      
      const newZIndex = highestZIndex + 1
      setHighestZIndex(newZIndex)
      
      return prev.map(w => 
        w.id === id ? { ...w, zIndex: newZIndex } : w
      )
    })
  }, [highestZIndex])

  const getWindowZIndex = useCallback((id: string) => {
    const window = windows.find(w => w.id === id)
    return window?.zIndex || 1
  }, [windows])

  const hideWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isVisible: false } : w
    ))
  }, [])

  const showWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isVisible: true } : w
    ))
  }, [])

  return {
    windows,
    addWindow,
    removeWindow,
    focusWindow,
    getWindowZIndex,
    hideWindow,
    showWindow
  }
}