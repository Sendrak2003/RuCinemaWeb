import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal, Image } from 'react-native';

interface ErrorAlertProps {
  isVisible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ isVisible, errorMessage, onClose }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../assets/images/close.png')} style={styles.errorIcon} /> 
          <Text style={styles.modalTitle}>Ошибка</Text>
          <Text style={styles.modalMessage}>{errorMessage}</Text>
          <Pressable style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: "#593EFF",
    padding: '5%', 
    borderRadius: 10,
    alignItems: 'center',
  },
  errorIcon: {
    width: 50, 
    height: 50, 
    marginBottom: '5%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '2.5%',
  },
  modalMessage: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: '5%',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: '10%',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ErrorAlert;
