"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useSocket } from "../hooks/useSocket"

interface SocketContextType {
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  connect: (vehicle: string) => Promise<void>
  disconnect: () => void
  sendLocationUpdate: (
    latitude: number,
    longitude: number,
    currentAddress: string,
    vehicleType: string,
    lastUpdatedTime: string,
  ) => Promise<void>
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socketHook = useSocket()

  return <SocketContext.Provider value={socketHook}>{children}</SocketContext.Provider>
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocketContext deve ser usado dentro de um SocketProvider")
  }
  return context
}
