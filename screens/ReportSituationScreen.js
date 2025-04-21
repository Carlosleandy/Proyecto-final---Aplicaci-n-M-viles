import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { reportSituation } from '../services/api';

// Pantalla para reportar una situación de emergencia
const ReportSituationScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  // Verificar permisos de ubicación al montar el componente
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso Denegado', 'No se otorgaron permisos de ubicación. Puedes ingresar las coordenadas manualmente.');
          setLocationPermission(false);
        } else {
          setLocationPermission(true);
        }
      } catch (error) {
        console.error('Error al verificar permisos de ubicación:', error);
        setLocationPermission(false);
      }
    };
    checkLocationPermission();
  }, []);

  // Obtener la ubicación actual del usuario
  const getLocation = async () => {
    if (!locationPermission) {
      Alert.alert('Permiso Requerido', 'No tienes permisos de ubicación. Por favor, habilítalos en la configuración o ingresa las coordenadas manualmente.');
      return;
    }

    setLocationLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación. Ingresa las coordenadas manualmente.');
      console.error('Error al obtener ubicación:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  // Enviar el reporte de la situación
  const handleReport = async () => {
    if (!title || !description || !latitude || !longitude) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Autenticación Requerida', 'Debes iniciar sesión para reportar una situación.');
        navigation.navigate('LoginScreen');
        return;
      }

      await reportSituation({
        titulo: title,
        descripcion: description,
        lat: latitude,
        lng: longitude,
      });

      Alert.alert('Éxito', 'Situación reportada exitosamente.');
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo reportar la situación. Intenta de nuevo.');
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
        <Text style={styles.headerTitle}>Reportar Situación</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ejemplo: Inundación en mi zona"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe la situación..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
        <Text style={styles.label}>Ubicación</Text>
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, styles.locationInput]}
            value={latitude}
            onChangeText={setLatitude}
            placeholder="Latitud"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.locationInput]}
            value={longitude}
            onChangeText={setLongitude}
            placeholder="Longitud"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.locationButton, locationLoading && styles.buttonDisabled]}
            onPress={getLocation}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Icon name="my-location" size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleReport}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Reportar Situación</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationInput: {
    flex: 1,
    marginRight: 10,
  },
  locationButton: {
    backgroundColor: '#FF6200', // Naranja institucional
    borderRadius: 8,
    padding: 12,
    elevation: 3,
  },
  submitButton: {
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

export default ReportSituationScreen;