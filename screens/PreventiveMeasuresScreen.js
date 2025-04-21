import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchPreventiveMeasures } from '../services/api';

// Pantalla de "Medidas Preventivas"
const PreventiveMeasuresScreen = () => {
  const navigation = useNavigation();
  const [measures, setMeasures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener medidas preventivas desde la API
  useEffect(() => {
    const loadMeasures = async () => {
      try {
        const data = await fetchPreventiveMeasures();
        setMeasures(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener medidas preventivas:', error);
        setLoading(false);
      }
    };
    loadMeasures();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medidas Preventivas</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando medidas...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {measures.length > 0 ? (
            measures.map((measure, index) => (
              <View key={index} style={styles.measureCard}>
                <Text style={styles.measureTitle}>{measure.titulo}</Text>
                <Text style={styles.measureDescription}>{measure.descripcion}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No hay medidas preventivas disponibles.</Text>
          )}
        </ScrollView>
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
  content: {
    padding: 20,
  },
  measureCard: {
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
  measureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003087', // Azul institucional
    marginBottom: 8,
  },
  measureDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PreventiveMeasuresScreen;