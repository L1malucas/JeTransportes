import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MapPin, AlertCircle, Clock } from "lucide-react-native";
import { styles } from "../styles/styles";

interface LocationTrackerCardProps {
  currentAddress: string | null;
  loadingLocation: boolean;
  gpsEnabled: boolean;
  lastUpdatedTime: string;
}

export const LocationTrackerCard: React.FC<LocationTrackerCardProps> = ({
  currentAddress,
  loadingLocation,
  gpsEnabled,
  lastUpdatedTime,
}) => {
  const renderContent = () => {
    if (!gpsEnabled) {
      return (
        <View style={styles.warningContainer}>
          <AlertCircle size={24} color="#dc2626" />
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>
              GPS/Localização está desligado!
            </Text>
          </View>
        </View>
      );
    }

    if (loadingLocation) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Obtendo localização...</Text>
        </View>
      );
    }

    return (
      <View style={styles.addressContainer}>
        <MapPin size={20} color="#4b5563" />
        <Text style={styles.addressText}>
          {currentAddress || "Endereço não disponível"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <MapPin size={24} color="#2563eb" />
        <Text style={styles.title}>Meu local atual</Text>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
        <View style={styles.divider} />
        <View style={styles.timestampContainer}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.timestampText}>
            Última atualização: {lastUpdatedTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LocationTrackerCard;
