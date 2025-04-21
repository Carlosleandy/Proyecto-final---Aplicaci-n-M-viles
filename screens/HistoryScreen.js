import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Pantalla de "Historia"
const HistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historia</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Historia de la Defensa Civil</Text>
        <Text style={styles.description}>
          La Defensa Civil de la República Dominicana fue creada el 22 de junio de 1966 mediante el Decreto No. 2070, durante el gobierno del Dr. Joaquín Balaguer. Su fundación tuvo como objetivo principal proteger a la población frente a desastres naturales y emergencias, en un país frecuentemente afectado por huracanes y otros fenómenos. Desde entonces, la institución ha evolucionado, incorporando miles de voluntarios y modernizando sus operaciones para responder de manera efectiva a las necesidades de la ciudadanía.
        </Text>
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
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003087', // Azul institucional
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default HistoryScreen;