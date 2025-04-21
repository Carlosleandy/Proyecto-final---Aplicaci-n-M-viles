import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchShelters } from '../services/api';
import * as Location from 'expo-location';

// Pantalla que muestra un mapa con los albergues
const MapScreen = () => {
  const navigation = useNavigation();
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);

  // Solicitar permisos de ubicación y obtener albergues
  useEffect(() => {
    const setupMap = async () => {
      try {
        // Solicitar permisos de ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso Denegado', 'No se otorgaron permisos de ubicación. No podremos mostrar tu posición en el mapa.');
          setLocationPermission(false);
        } else {
          setLocationPermission(true);
        }

        // Obtener albergues
        const data = await fetchShelters();
        setShelters(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al configurar el mapa:', error);
        setLoading(false);
      }
    };
    setupMap();
  }, []);

  // Región inicial del mapa (centrado en Santo Domingo, República Dominicana)
  const initialRegion = {
    latitude: 18.4861, // Latitud de Santo Domingo
    longitude: -69.9312, // Longitud de Santo Domingo
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa de Albergues</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando albergues...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={locationPermission}
          showsMyLocationButton={locationPermission}
        >
          {shelters.map((shelter, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(shelter.lat),
                longitude: parseFloat(shelter.lng),
              }}
              title={shelter.edificio}
              description={`${shelter.ciudad} - Capacidad: ${shelter.capacidad || 'No especificada'}`}
              pinColor="#FF6200" // Naranja institucional
            />
          ))}
        </MapView>
      )}
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
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default MapScreen;