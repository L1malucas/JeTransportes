import React from "react";
import { View, Text } from "react-native";
import { MapPin } from "lucide-react-native";
import { styles } from "../styles/styles";

interface LocationInfoProps {
  currentAddress: string | null;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ currentAddress }) => (
  <View style={styles.addressContainer}>
    <MapPin size={20} color="#4b5563" />
    <Text style={styles.addressText}>
      {currentAddress || "Endereço não disponível"}
    </Text>
  </View>
);

export default LocationInfo;
