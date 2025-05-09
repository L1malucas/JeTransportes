"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useNetwork } from "../hooks/useNetwork"

interface NetworkContextType {
  isNetworkAvailable: boolean
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const networkHook = useNetwork()

  return <NetworkContext.Provider value={networkHook}>{children}</NetworkContext.Provider>
}

export const useNetworkContext = () => {
  const context = useContext(NetworkContext)
  if (context === undefined) {
    throw new Error("useNetworkContext deve ser usado dentro de um NetworkProvider")
  }
  return context
}
