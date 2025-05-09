"use client"

import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useNotification } from "../hooks/useNotification"

interface NotificationContextType {
  showNotification: (title: string, body: string) => Promise<void>
  removeNotification: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const notificationHook = useNotification()

  return <NotificationContext.Provider value={notificationHook}>{children}</NotificationContext.Provider>
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotificationContext deve ser usado dentro de um NotificationProvider")
  }
  return context
}
