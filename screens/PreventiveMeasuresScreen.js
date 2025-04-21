import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Pantalla que muestra medidas preventivas para emergencias
const PreventiveMeasuresScreen = () => {
  const navigation = useNavigation();

  // Datos estáticos de medidas preventivas
  const measures = [
    {
      title: 'Preparación para Huracanes',
      description:
        '1. Mantén un kit de emergencia con agua, alimentos no perecederos, linternas, baterías y un botiquín.\n2. Identifica rutas de evacuación y albergues cercanos.\n3. Refuerza ventanas y puertas para proteger tu hogar.\n4. Mantente informado a través de las alertas de la Defensa Civil.',
    },
    {
      title: 'Preparación para Terremotos',
      description:
        '1. Identifica lugares seguros en tu hogar, como debajo de muebles sólidos.\n2. Asegura objetos pesados que puedan caer, como estanterías o lámparas.\n3. Ten un plan de comunicación con tu familia.\n4. Participa en simulacros de evacuación organizados por la Defensa Civil.',
    },
    {
      title: 'Inundaciones',
      description:
        '1. Evita construir en zonas propensas a inundaciones.\n2. Eleva electrodomésticos importantes por encima del nivel de inundación.\n3. Nunca camines o conduzcas por áreas inundadas.\n4. Sigue las advertencias y evacua si es necesario.',
    },
    {
      title: 'Incendios',
      description:
        '1. Instala detectores de humo en tu hogar y revisa sus baterías regularmente.\n2. Mantén un extintor y aprende a usarlo.\n3. Crea un plan de escape con dos rutas de salida.\n4. No dejes velas o estufas encendidas sin supervisión.',
    },
    {
      title: 'Emergencias Médicas',
      description:
        '1. Aprende primeros auxilios básicos y ten un botiquín bien equipado.\n2. Conoce los números de emergencia: 911 y el de la Defensa Civil (809-472-8614).\n3. Mantén una lista de contactos de emergencia.\n4. Si tienes condiciones médicas, lleva contigo tu información médica.',
    },
  ];

  // Renderizar cada medida como una tarjeta
  const renderMeasure = ({ item }) => (
    <View style={styles.measureCard}>
      <Text style={styles.measureTitle}>{item.title}</Text>
      <Text style={styles.measureDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medidas Preventivas</Text>
      </View>
      <FlatList
        data={measures}
        renderItem={renderMeasure}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
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
    marginBottom: 10,
  },
  measureDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});

export default PreventiveMeasuresScreen;