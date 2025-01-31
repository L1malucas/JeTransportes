import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

interface ScheduleToggleProps {
  showSchedule: boolean;
  onToggle: (value: boolean) => void;
}

const ScheduleToggle: React.FC<ScheduleToggleProps> = ({ showSchedule, onToggle }) => {
  return (
    <View style={styles.toggleGroup}>
      <TouchableOpacity
        onPress={() => onToggle(false)}
        style={[styles.toggleButton, !showSchedule ? styles.activeButton : styles.inactiveButton, { marginRight: 8 }]}
      >
        <Text style={!showSchedule ? styles.activeText : styles.inactiveText}>Tempo Real</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggle(true)}
        style={[styles.toggleButton, showSchedule ? styles.activeButton : styles.inactiveButton]}
      >
        <Text style={showSchedule ? styles.activeText : styles.inactiveText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleToggle;
