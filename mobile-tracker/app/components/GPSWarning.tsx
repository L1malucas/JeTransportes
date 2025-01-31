import React from "react";
import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { styles } from "../styles/styles";

const GPSWarning: React.FC = () => (
  <View style={styles.warningContainer}>
    <AlertCircle size={24} color="#dc2626" />
    <View style={styles.warningTextContainer}>
      <Text style={styles.warningText}>GPS/Localização está desligado!</Text>
    </View>
  </View>
);

export default GPSWarning;
