import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantalla principal - Tablero de navegación
const HomeScreen = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      setIsAuthenticated(false);
      Alert.alert('Éxito', 'Sesión cerrada correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  const sections = [
    { name: 'Reportar Situación', screen: 'ReportSituationScreen', icon: 'report' },
    { name: 'Mapa', screen: 'MapScreen', icon: 'map' },
    { name: 'Mapa de Situaciones', screen: 'SituationMapScreen', icon: 'location-on' },
    { name: 'Albergues', screen: 'SheltersScreen', icon: 'home' },
    { name: 'Medidas Preventivas', screen: 'PreventiveMeasuresScreen', icon: 'warning' },
    { name: 'Servicios', screen: 'ServicesScreen', icon: 'build' },
    { name: 'Noticias', screen: 'NewsScreen', icon: 'article' },
    { name: 'Noticias Autenticadas', screen: 'NewsAuthenticatedScreen', icon: 'verified-user' },
    { name: 'Videos', screen: 'VideosScreen', icon: 'play-circle-outline' },
    { name: 'Mis Situaciones', screen: 'MySituationsScreen', icon: 'list' },
    { name: 'Voluntario', screen: 'VolunteerScreen', icon: 'person-add' },
    { name: 'Miembros', screen: 'MembersScreen', icon: 'people' },
    { name: 'Historia', screen: 'HistoryScreen', icon: 'history' },
    { name: 'Acerca de', screen: 'AboutScreen', icon: 'info' },
    { name: 'Iniciar Sesión', screen: 'LoginScreen', icon: 'login' },
    { name: 'Cambiar Contraseña', screen: 'ChangePasswordScreen', icon: 'lock' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://adamix.net/defensa_civil/assets/images/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Defensa Civil</Text>
        {isAuthenticated && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { activeOpacity: 0.7 }]}
              onPress={() => navigation.navigate(section.screen)}
            >
              <Icon name={section.icon} size={40} color="#FF6200" />
              <Text style={styles.cardText}>{section.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#FF6200', // Borde naranja
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087', // Azul institucional
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;