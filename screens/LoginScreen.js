import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantalla de inicio de sesión
const LoginScreen = () => {
  const navigation = useNavigation();
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!cedula || !clave) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await login({ cedula, clave });
      // Almacenar token y user_id
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userId', response.user_id.toString());
      Alert.alert('Éxito', 'Inicio de sesión exitoso.');
      navigation.replace('HomeScreen'); // Redirige a HomeScreen
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.');
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
        <Text style={styles.headerTitle}>Iniciar Sesión</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Cédula</Text>
        <TextInput
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
          placeholder="Ingresa tu cédula"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={clave}
          onChangeText={setClave}
          secureTextEntry
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RecoverPasswordScreen')}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
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
    marginbutton: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF6200', // Naranja institucional
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#FF9B5C', // Naranja más claro cuando está deshabilitado
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
  linkText: {
    fontSize: 16,
    color: '#FF6200', // Naranja institucional
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;