import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchAuthenticatedNews } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantalla que muestra noticias exclusivas para usuarios autenticados
const NewsAuthenticatedScreen = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación y obtener noticias
  useEffect(() => {
    const loadNews = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Autenticación Requerida', 'Debes iniciar sesión para ver estas noticias.');
          navigation.navigate('LoginScreen');
          return;
        }

        const data = await fetchAuthenticatedNews();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener noticias autenticadas:', error);
        Alert.alert('Error', error.message || 'No se pudieron cargar las noticias.');
        setLoading(false);
      }
    };
    loadNews();
  }, [navigation]);

  // Renderizar cada noticia como una tarjeta
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.titulo}</Text>
      <Text style={styles.newsDescription}>{item.descripcion}</Text>
      <Text style={styles.newsDate}>Fecha: {item.fecha || 'No especificada'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Noticias Autenticadas</Text>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6200" />
          <Text style={styles.loaderText}>Cargando noticias...</Text>
        </View>
      ) : (
        <FlatList
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay noticias disponibles.</Text>
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
  newsCard: {
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
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003087', // Azul institucional
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  newsDate: {
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

export default NewsAuthenticatedScreen;