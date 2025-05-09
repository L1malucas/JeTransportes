"use client"

import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

export const useNotification = () => {
  // Configurar notificações
  useEffect(() => {
    // Definir manipulador de notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    })

    // Solicitar permissões
    ;(async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        })
      }

      await Notifications.requestPermissionsAsync()
    })()
  }, [])

  // Mostrar notificação
  const showNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data: "goes here" },
        autoDismiss: false,
        sticky: true,
      },
      trigger: null, // Mostrar imediatamente
    })
  }

  // Remover todas as notificações
  const removeNotification = async () => {
    await Notifications.dismissAllNotificationsAsync()
  }

  return {
    showNotification,
    removeNotification,
  }
}
