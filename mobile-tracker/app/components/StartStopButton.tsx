import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { styles } from '../styles/styles';

interface StartStopButtonProps {
  isTracking: boolean;
  onPress: () => void;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({ isTracking, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.submitButton, isTracking ? styles.stopButton : styles.startButton]}>
      {isTracking ? (
        <>
          <Pause size={20} color="white" />
          <Text style={styles.buttonText}> Parar</Text>
        </>
      ) : (
        <>
          <Play size={20} color="white" />
          <Text style={styles.buttonText}> Iniciar</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default StartStopButton;
