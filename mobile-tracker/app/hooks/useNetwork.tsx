"use client"

import { useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo"

export const useNetwork = () => {
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true)

  useEffect(() => {
    // Inscrever-se para atualizações do estado da rede
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsNetworkAvailable(state.isConnected ?? false)
    })

    // Verificação inicial
    NetInfo.fetch().then((state) => {
      setIsNetworkAvailable(state.isConnected ?? false)
    })

    // Limpar ao desmontar
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    isNetworkAvailable,
  }
}
