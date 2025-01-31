import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles/styles';

interface VehicleTypeInputProps {
  vehicleType: string;
  onChange: (text: string) => void;
}

const VehicleTypeInput: React.FC<VehicleTypeInputProps> = ({ vehicleType, onChange }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Digite o tipo do veículo</Text>
      <TextInput
        value={vehicleType}
        onChangeText={onChange}
        style={styles.input}
        placeholder="Ex.: Ônibus, Van, Micro-ônibus"
      />
    </View>
  );
};

export default VehicleTypeInput;
