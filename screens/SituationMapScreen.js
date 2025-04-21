import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchSituations } from '../services/api';

// Pantalla que muestra un mapa con las situaciones reportadas
const SituationMapScreen = () => {
  const navigation = useNavigation();
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener situaciones desde la API
  useEffect(() => {
    const loadSituations = async () => {
      try {
        const data = await fetchSituations();
        setSituations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener situaciones:', error);
        setLoading(false);
      }
    };
    loadSituations();
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
        <Text style={styles.headerTitle}>Mapa de Situaciones</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando situaciones...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {situations.map((situation, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(situation.lat),
                longitude: parseFloat(situation.lng),
              }}
              title={situation.titulo}
              description={situation.descripcion}
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

export default SituationMapScreen;