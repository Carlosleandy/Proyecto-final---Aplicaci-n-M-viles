import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dirección base de la API
const API_URL = 'https://adamix.net/defensa_civil/def/';

// Configuración de Axios con headers por defecto
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las solicitudes autenticadas
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función auxiliar para manejar errores
const handleError = (error, defaultMessage) => {
  console.error(defaultMessage, error);
  const message = error.response?.data?.mensaje || defaultMessage;
  throw new Error(message);
};

// Obtener servicios
export const fetchServices = async () => {
  try {
    const response = await api.get('/servicios.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener servicios');
  } catch (error) {
    handleError(error, 'Error al obtener servicios:');
  }
};

// Obtener noticias
export const fetchNews = async () => {
  try {
    const response = await api.get('/noticias.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener noticias');
  } catch (error) {
    handleError(error, 'Error al obtener noticias:');
  }
};

// Obtener albergues
export const fetchShelters = async () => {
  try {
    const response = await api.get('/albergues.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener albergues');
  } catch (error) {
    handleError(error, 'Error al obtener albergues:');
  }
};

// Obtener medidas preventivas
export const fetchPreventiveMeasures = async () => {
  try {
    const response = await api.get('/medidas_preventivas.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener medidas preventivas');
  } catch (error) {
    handleError(error, 'Error al obtener medidas preventivas:');
  }
};

// Obtener miembros
export const fetchMembers = async () => {
  try {
    const response = await api.get('/miembros.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener miembros');
  } catch (error) {
    handleError(error, 'Error al obtener miembros:');
  }
};

// Obtener situaciones
export const fetchSituations = async () => {
  try {
    const response = await api.post('/situaciones.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener situaciones');
  } catch (error) {
    handleError(error, 'Error al obtener situaciones:');
  }
};

// Registrar voluntario
export const registerVolunteer = async (data) => {
  try {
    const response = await api.post('/registro.php', data);
    if (response.data.exito) {
      return response.data;
    }
    throw new Error(response.data.mensaje || 'Error al registrar voluntario');
  } catch (error) {
    handleError(error, 'Error al registrar voluntario:');
  }
};

// Iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await api.post('/iniciar_sesion.php', credentials);
    if (response.data.exito) {
      const { token, id: user_id } = response.data.datos; // Ajustado según la respuesta de la API
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', user_id.toString());
      return { token, user_id };
    }
    throw new Error(response.data.mensaje || 'Error al iniciar sesión');
  } catch (error) {
    handleError(error, 'Error al iniciar sesión:');
  }
};

// Recuperar contraseña
export const recoverPassword = async (data) => {
  try {
    const response = await api.post('/recuperar_clave.php', data);
    if (response.data.exito) {
      return response.data;
    }
    throw new Error(response.data.mensaje || 'Error al recuperar contraseña');
  } catch (error) {
    handleError(error, 'Error al recuperar contraseña:');
  }
};

// Reportar situación
export const reportSituation = async (data) => {
  try {
    const response = await api.post('/nueva_situacion.php', data);
    if (response.data.exito) {
      return response.data;
    }
    throw new Error(response.data.mensaje || 'Error al reportar situación');
  } catch (error) {
    handleError(error, 'Error al reportar situación:');
  }
};

// Obtener mis situaciones
export const fetchMySituations = async () => {
  try {
    const response = await api.post('/situaciones.php');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener mis situaciones');
  } catch (error) {
    handleError(error, 'Error al obtener mis situaciones:');
  }
};

// Cambiar contraseña
export const changePassword = async (data) => {
  try {
    const response = await api.post('/cambiar_clave.php', data);
    if (response.data.exito) {
      return response.data;
    }
    throw new Error(response.data.mensaje || 'Error al cambiar contraseña');
  } catch (error) {
    handleError(error, 'Error al cambiar contraseña:');
  }
};