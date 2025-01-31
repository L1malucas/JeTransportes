import React from "react";
import { View, Text } from "react-native";
import { MapPin } from "lucide-react-native";
import { styles } from "../styles/styles";

import LocationTimestamp from "./LocationTimestamp";
import GPSWarning from "./GPSWarning";
import LoadingLocation from "./LoadingLocation";
import LocationInfo from "./LocationInfo";

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
      return <GPSWarning />;
    }

    if (loadingLocation) {
      return <LoadingLocation />;
    }

    return <LocationInfo currentAddress={currentAddress} />;
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
        <LocationTimestamp lastUpdatedTime={lastUpdatedTime} />
      </View>
    </View>
  );
};

export default LocationTrackerCard;
