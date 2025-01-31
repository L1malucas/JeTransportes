import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';
import { styles } from '../styles/styles';
import { formatTime } from '../utils/timeInput';

interface ScheduleFormProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (text: string) => void;
  onEndTimeChange: (text: string) => void;
  canSchedule: boolean;
  onSubmit: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  canSchedule,
  onSubmit
}) => {
  return (
    <View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Horário de Início</Text>
        <TextInput
          value={startTime}
          onChangeText={onStartTimeChange}
          style={styles.input}
          placeholder="HH:MM"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Horário de Término</Text>
        <TextInput
          value={endTime}
          onChangeText={onEndTimeChange}
          style={styles.input}
          placeholder="HH:MM"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      {canSchedule && (
        <TouchableOpacity onPress={onSubmit} style={[styles.submitButton, styles.scheduleButton]}>
          <Clock size={20} color="white" />
          <Text style={styles.buttonText}> Confirmar Horário</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScheduleForm;
