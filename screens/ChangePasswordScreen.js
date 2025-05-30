import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { changePassword } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantalla para cambiar contraseña
const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Debes iniciar sesión para cambiar tu contraseña.');
        navigation.navigate('LoginScreen');
        return;
      }

      await changePassword({
        clave_anterior: oldPassword,
        clave_nueva: newPassword,
      });

      Alert.alert('Éxito', 'Contraseña cambiada exitosamente.');
      setOldPassword('');
      setNewPassword('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo cambiar la contraseña. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Contraseña Anterior</Text>
        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
          placeholder="Ingresa tu contraseña anterior"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Nueva Contraseña</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="Ingresa tu nueva contraseña"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo gris claro
  },
  header: {
    backgroundColor: '#003087', // Azul institucional
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
  content: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087', // Azul institucional
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF6200', // Naranja institucional
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#FF9B5C', // Naranja más claro cuando está deshabilitado
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
});

export default ChangePasswordScreen;