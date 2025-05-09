import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { LocationProvider } from "./app/contexts/LocationContext"
import { WebSocketProvider } from "./app/contexts/WebSocketContext"
import { NetworkProvider } from "./app/contexts/NetworkContext"
import { NotificationProvider } from "./app/contexts/NotificationContext"

export default function App() {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <LocationProvider>
          <WebSocketProvider>
            <NotificationProvider>
              <Slot />
              <StatusBar style="auto" />
            </NotificationProvider>
          </WebSocketProvider>
        </LocationProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  )
}
