import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchShelters } from '../services/api';

// Pantalla que muestra la lista de albergues
const SheltersScreen = () => {
  const navigation = useNavigation();
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener albergues desde la API
  useEffect(() => {
    const loadShelters = async () => {
      try {
        const data = await fetchShelters();
        setShelters(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener albergues:', error);
        setLoading(false);
      }
    };
    loadShelters();
  }, []);

  // Renderizar cada albergue como una tarjeta
  const renderShelter = ({ item }) => (
    <View style={styles.shelterCard}>
      <Text style={styles.shelterName}>{item.edificio}</Text>
      <Text style={styles.shelterCity}>Ciudad: {item.ciudad}</Text>
      <Text style={styles.shelterCapacity}>Capacidad: {item.capacidad || 'No especificada'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Albergues</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando albergues...</Text>
        </View>
      ) : (
        <FlatList
          data={shelters}
          renderItem={renderShelter}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay albergues disponibles.</Text>
          }
        />
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
  listContent: {
    padding: 20,
  },
  shelterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#FF6200', // Borde naranja
  },
  shelterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003087', // Azul institucional
    marginBottom: 5,
  },
  shelterCity: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  shelterCapacity: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SheltersScreen;