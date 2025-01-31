import React from "react";
import { View, Text } from "react-native";
import { Clock } from "lucide-react-native";
import { styles } from "../styles/styles";

interface LocationTimestampProps {
  lastUpdatedTime: string;
}

const LocationTimestamp: React.FC<LocationTimestampProps> = ({
  lastUpdatedTime,
}) => (
  <View style={styles.timestampContainer}>
    <Clock size={16} color="#6b7280" />
    <Text style={styles.timestampText}>
      Última atualização: {lastUpdatedTime}
    </Text>
  </View>
);

export default LocationTimestamp;
