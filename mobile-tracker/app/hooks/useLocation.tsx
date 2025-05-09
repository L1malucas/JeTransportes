"use client"

import { useState, useEffect } from "react"
import * as Location from "expo-location"
import { Platform } from "react-native"

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [isGpsEnabled, setIsGpsEnabled] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Solicitar permissão de localização
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status === "granted") {
        setHasLocationPermission(true)

        // Também solicitar permissão em segundo plano no iOS
        if (Platform.OS === "ios") {
          const backgroundStatus = await Location.requestBackgroundPermissionsAsync()
          if (backgroundStatus.status !== "granted") {
            setErrorMsg("Permissão de localização em segundo plano não concedida")
          }
        }

        return true
      } else {
        setErrorMsg("Permissão para acessar a localização foi negada")
        setHasLocationPermission(false)
        return false
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão de localização:", error)
      setErrorMsg("Erro ao solicitar permissão de localização")
      return false
    }
  }

  // Verificar se o GPS está ativado
  const checkGpsStatus = async () => {
    try {
      const providerStatus = await Location.getProviderStatusAsync()
      setIsGpsEnabled(providerStatus.locationServicesEnabled)
    } catch (error) {
      console.error("Erro ao verificar status do GPS:", error)
      setIsGpsEnabled(false)
    }
  }

  // Obter endereço a partir das coordenadas
  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude })
      const address = reverseGeocode[0]

      if (address) {
        const formattedAddress = `${address.street || ""}, ${address.streetNumber || ""} - ${address.district || ""}`
        setCurrentAddress(formattedAddress !== ", - " ? formattedAddress : "Endereço não encontrado")
      } else {
        setCurrentAddress("Endereço não encontrado")
      }
    } catch (error) {
      console.error("Erro ao obter endereço:", error)
      setCurrentAddress("Erro ao obter endereço")
    }
  }

  // Obter localização atual
  const getCurrentLocation = async () => {
    try {
      if (!hasLocationPermission) {
        return null
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      setLocation(currentLocation)

      // Obter endereço a partir das coordenadas
      if (currentLocation?.coords) {
        await getAddressFromCoordinates(currentLocation.coords.latitude, currentLocation.coords.longitude)
      }

      return currentLocation
    } catch (error) {
      console.error("Erro ao obter localização atual:", error)
      setErrorMsg("Erro ao obter localização atual")
      return null
    }
  }

  // Iniciar atualizações de localização
  const startLocationUpdates = async () => {
    try {
      if (!hasLocationPermission) {
        return
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // distância mínima (em metros) entre atualizações
          timeInterval: 5000, // tempo mínimo (em ms) entre atualizações
        },
        async (newLocation) => {
          setLocation(newLocation)

          // Atualizar endereço quando a localização mudar
          if (newLocation?.coords) {
            await getAddressFromCoordinates(newLocation.coords.latitude, newLocation.coords.longitude)
          }
        },
      )
    } catch (error) {
      console.error("Erro ao iniciar atualizações de localização:", error)
      setErrorMsg("Erro ao iniciar atualizações de localização")
    }
  }

  // Inicializar rastreamento de localização
  useEffect(() => {
    ;(async () => {
      await requestLocationPermission()
      await checkGpsStatus()

      // Configurar verificação periódica do status do GPS
      const gpsCheckInterval = setInterval(checkGpsStatus, 10000)

      if (hasLocationPermission) {
        await getCurrentLocation()
        await startLocationUpdates()
      }

      return () => {
        clearInterval(gpsCheckInterval)
      }
    })()
  }, [hasLocationPermission])

  return {
    location,
    currentAddress,
    hasLocationPermission,
    isGpsEnabled,
    errorMsg,
    requestLocationPermission,
    getCurrentLocation,
    checkGpsStatus,
  }
}
