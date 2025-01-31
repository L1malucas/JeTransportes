import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "../styles/styles";

const LoadingLocation: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#2563eb" />
    <Text style={styles.loadingText}>Obtendo localização...</Text>
  </View>
);

export default LoadingLocation;
