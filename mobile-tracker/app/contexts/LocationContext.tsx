"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useLocation } from "../hooks/useLocation"
import type { LocationObject } from "expo-location"

interface LocationContextType {
  location: LocationObject | null
  currentAddress: string | null
  hasLocationPermission: boolean
  isGpsEnabled: boolean
  errorMsg: string | null
  requestLocationPermission: () => Promise<boolean>
  getCurrentLocation: () => Promise<LocationObject | null>
  checkGpsStatus: () => Promise<void>
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const locationHook = useLocation()

  return <LocationContext.Provider value={locationHook}>{children}</LocationContext.Provider>
}

export const useLocationContext = () => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocationContext deve ser usado dentro de um LocationProvider")
  }
  return context
}
