"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Alert } from "react-native"
import { useNetwork } from "./useNetwork"
import { io, type Socket } from "socket.io-client"

// URL do servidor Socket.IO
const SOCKET_SERVER_URL = "https://jetransportes.onrender.com/"

// Gerar um ID de cliente único
const generateClientId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [vehicleType, setVehicleType] = useState<string | null>(null)
  const [clientId] = useState(generateClientId())

  const socketRef = useRef<Socket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { isNetworkAvailable } = useNetwork()

  // Conectar ao Socket.IO
  const connect = useCallback(
    async (vehicle: string) => {
      if (isConnected || isConnecting) {
        return
      }

      try {
        setIsConnecting(true)
        setError(null)
        setVehicleType(vehicle)

        // Criar nova conexão Socket.IO
        const socket = io(SOCKET_SERVER_URL, {
          transports: ["websocket", "polling"],
          withCredentials: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        })

        socket.on("connect", () => {
          console.log("Socket.IO conectado")
          setIsConnected(true)
          setIsConnecting(false)
          socketRef.current = socket

          Alert.alert("Conexão estabelecida", "Conexão com servidor estabelecida com sucesso")
        })

        socket.on("disconnect", (reason) => {
          console.log("Socket.IO desconectado:", reason)
          setIsConnected(false)
          socketRef.current = null

          // Tentar reconectar se a rede estiver disponível e tivermos um tipo de veículo
          if (isNetworkAvailable && vehicleType) {
            scheduleReconnect()
          }
        })

        socket.on("connect_error", (error) => {
          console.error("Erro de conexão Socket.IO:", error)
          setError("Erro na conexão Socket.IO")
          setIsConnecting(false)
          Alert.alert("Erro na conexão", "Falha ao conectar ao servidor Socket.IO")
        })

        socket.on("error", (error) => {
          console.error("Erro Socket.IO:", error)
          setError("Erro no Socket.IO")
        })
      } catch (error) {
        console.error("Erro ao conectar ao Socket.IO:", error)
        setError("Erro ao conectar ao servidor")
        setIsConnecting(false)
        Alert.alert("Falha ao conectar", "Não foi possível estabelecer conexão com o servidor")
      }
    },
    [isConnected, isConnecting, isNetworkAvailable, clientId],
  )

  // Desconectar do Socket.IO
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }

    setIsConnected(false)
    setVehicleType(null)
  }, [])

  // Agendar reconexão
  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      if (vehicleType && isNetworkAvailable && !isConnected) {
        console.log("Tentando reconectar Socket.IO...")
        connect(vehicleType)
      }
    }, 5000) // Tentar reconectar após 5 segundos
  }, [connect, isConnected, isNetworkAvailable, vehicleType])

  // Enviar atualização de localização
  const sendLocationUpdate = useCallback(
    (latitude: number, longitude: number, currentAddress: string, vehicleType: string, lastUpdatedTime: string) => {
      if (!isConnected || !socketRef.current) {
        return Promise.reject("Socket.IO não conectado")
      }

      try {
        const locationData = {
          clientId,
          latitude,
          longitude,
          currentAddress: currentAddress || "Endereço não disponível",
          vehicleType,
          lastUpdatedTime,
        }

        socketRef.current.emit("location", locationData)
        console.log("Dados de localização enviados:", locationData)
        return Promise.resolve()
      } catch (error) {
        console.error("Erro ao enviar atualização de localização:", error)
        return Promise.reject(error)
      }
    },
    [isConnected, clientId],
  )

  // Reconectar quando a rede ficar disponível
  useEffect(() => {
    if (isNetworkAvailable && vehicleType && !isConnected && !isConnecting) {
      scheduleReconnect()
    }
  }, [isNetworkAvailable, vehicleType, isConnected, isConnecting, scheduleReconnect])

  // Limpar ao desmontar
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendLocationUpdate,
  }
}
