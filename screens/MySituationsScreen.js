import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchMySituations } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantalla que muestra las situaciones reportadas por el usuario
const MySituationsScreen = () => {
  const navigation = useNavigation();
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación y obtener situaciones
  useEffect(() => {
    const loadSituations = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Autenticación Requerida', 'Debes iniciar sesión para ver tus situaciones.');
          navigation.navigate('LoginScreen');
          return;
        }

        const data = await fetchMySituations();
        setSituations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener mis situaciones:', error);
        Alert.alert('Error', error.message || 'No se pudieron cargar tus situaciones.');
        setLoading(false);
      }
    };
    loadSituations();
  }, [navigation]);

  // Renderizar cada situación como una tarjeta
  const renderSituation = ({ item }) => (
    <View style={styles.situationCard}>
      <Text style={styles.situationTitle}>{item.titulo}</Text>
      <Text style={styles.situationDescription}>{item.descripcion}</Text>
      <Text style={styles.situationDate}>Fecha: {item.fecha || 'No especificada'}</Text>
      <Text style={styles.situationStatus}>Estado: {item.estado || 'Pendiente'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Situaciones</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando situaciones...</Text>
        </View>
      ) : (
        <FlatList
          data={situations}
          renderItem={renderSituation}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No has reportado ninguna situación.</Text>
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
  situationCard: {
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
  situationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003087', // Azul institucional
    marginBottom: 5,
  },
  situationDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  situationDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  situationStatus: {
    fontSize: 14,
    color: '#FF6200', // Naranja institucional
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MySituationsScreen;