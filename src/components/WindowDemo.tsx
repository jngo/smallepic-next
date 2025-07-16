"use client"

import { useState, useEffect } from 'react'
import Window from './Window'
import { useWindowManager } from './useWindowManager'

export default function WindowDemo() {
  const windowManager = useWindowManager()
  const [showWindow1, setShowWindow1] = useState(false)
  const [showWindow2, setShowWindow2] = useState(false)
  const [showWindow3, setShowWindow3] = useState(false)

  useEffect(() => {
    if (showWindow1) windowManager.addWindow('window1')
    else windowManager.removeWindow('window1')
  }, [showWindow1, windowManager])

  useEffect(() => {
    if (showWindow2) windowManager.addWindow('window2')
    else windowManager.removeWindow('window2')
  }, [showWindow2, windowManager])

  useEffect(() => {
    if (showWindow3) windowManager.addWindow('window3')
    else windowManager.removeWindow('window3')
  }, [showWindow3, windowManager])

  return (
    <div className="relative w-full h-screen bg-teal-600 overflow-hidden">
      {/* Desktop-like background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-700">
        {/* Control Panel */}
        <div className="absolute top-4 left-4 bg-gray-200 border-2 border-gray-400 border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500 p-4 shadow-lg">
          <h3 className="text-sm font-bold mb-2">Window Manager</h3>
          <div className="space-y-2">
            <button
              onClick={() => setShowWindow1(!showWindow1)}
              className="block w-full text-left px-2 py-1 bg-gray-300 border border-gray-400 hover:bg-gray-400 text-sm"
            >
              {showWindow1 ? 'Close' : 'Open'} Calculator
            </button>
            <button
              onClick={() => setShowWindow2(!showWindow2)}
              className="block w-full text-left px-2 py-1 bg-gray-300 border border-gray-400 hover:bg-gray-400 text-sm"
            >
              {showWindow2 ? 'Close' : 'Open'} Notepad
            </button>
            <button
              onClick={() => setShowWindow3(!showWindow3)}
              className="block w-full text-left px-2 py-1 bg-gray-300 border border-gray-400 hover:bg-gray-400 text-sm"
            >
              {showWindow3 ? 'Close' : 'Open'} About
            </button>
          </div>
        </div>

        {/* Windows */}
        {showWindow1 && (
          <Window
            title="Calculator"
            initialPosition={{ x: 200, y: 100 }}
            zIndex={windowManager.getWindowZIndex('window1')}
            onClose={() => setShowWindow1(false)}
            onFocus={() => windowManager.focusWindow('window1')}
            className="w-64"
          >
            <div className="bg-black text-green-400 p-2 font-mono text-right">
              <div className="text-lg">0</div>
            </div>
            <div className="grid grid-cols-4 gap-1 p-2">
              {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                <button
                  key={btn}
                  className="bg-gray-300 border border-gray-400 hover:bg-gray-400 text-sm py-1 px-2"
                >
                  {btn}
                </button>
              ))}
            </div>
          </Window>
        )}

        {showWindow2 && (
          <Window
            title="Notepad"
            initialPosition={{ x: 300, y: 150 }}
            zIndex={windowManager.getWindowZIndex('window2')}
            onClose={() => setShowWindow2(false)}
            onFocus={() => windowManager.focusWindow('window2')}
            className="w-80 h-64"
          >
            <textarea
              className="w-full h-full resize-none bg-white border-none outline-none p-2 font-mono text-sm"
              placeholder="Type your notes here..."
              defaultValue="This is a retro-style notepad window.

You can type here and drag the window around the screen.

The window system supports proper z-index management when you click on different windows."
            />
          </Window>
        )}

        {showWindow3 && (
          <Window
            title="About"
            initialPosition={{ x: 400, y: 200 }}
            zIndex={windowManager.getWindowZIndex('window3')}
            onClose={() => setShowWindow3(false)}
            onFocus={() => windowManager.focusWindow('window3')}
            className="w-72"
          >
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold mb-2">Retro Window System</h2>
              <p className="text-sm mb-4">
                A simple, draggable window component with retro operating system styling.
              </p>
              <div className="text-xs text-gray-600">
                <p>Features:</p>
                <ul className="list-disc list-inside mt-1 text-left">
                  <li>Draggable windows</li>
                  <li>Z-index management</li>
                  <li>Retro OS styling</li>
                  <li>Minimal dependencies</li>
                </ul>
              </div>
            </div>
          </Window>
        )}
      </div>
    </div>
  )
}