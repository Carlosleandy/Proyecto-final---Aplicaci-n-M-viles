import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dirección base de la API
const API_URL = 'https://adamix.net/defensa_civil/';

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
    const response = await api.get('/servicios');
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
    const response = await api.get('/noticias');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener noticias');
  } catch (error) {
    handleError(error, 'Error al obtener noticias:');
  }
};

// Obtener noticias autenticadas
export const fetchAuthenticatedNews = async () => {
  try {
    const response = await api.get('/noticias_autenticado');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener noticias autenticadas');
  } catch (error) {
    handleError(error, 'Error al obtener noticias autenticadas:');
  }
};

// Obtener videos
export const fetchVideos = async () => {
  try {
    const response = await api.get('/videos');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener videos');
  } catch (error) {
    handleError(error, 'Error al obtener videos:');
  }
};

// Obtener albergues
export const fetchShelters = async () => {
  try {
    const response = await api.get('/albergues');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener albergues');
  } catch (error) {
    handleError(error, 'Error al obtener albergues:');
  }
};

// Obtener miembros
export const fetchMembers = async () => {
  try {
    const response = await api.get('/miembros');
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
    const response = await api.get('/situaciones');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener situaciones');
  } catch (error) {
    handleError(error, 'Error al obtener situaciones:');
  }
};

// Obtener información "Acerca de"
export const fetchAbout = async () => {
  try {
    const response = await api.get('/acerca');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener información de acerca');
  } catch (error) {
    handleError(error, 'Error al obtener información de acerca:');
  }
};

// Obtener información de "Historia"
export const fetchHistory = async () => {
  try {
    const response = await api.get('/historia');
    if (response.data.exito) {
      return response.data.datos;
    }
    throw new Error(response.data.mensaje || 'Error al obtener información de historia');
  } catch (error) {
    handleError(error, 'Error al obtener información de historia:');
  }
};

// Registrar voluntario
export const registerVolunteer = async (data) => {
  try {
    const response = await api.post('/registrar_voluntario', data);
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
    const response = await api.post('/iniciar_sesion', credentials);
    if (response.data.exito) {
      const { token, user_id } = response.data.datos; // Asumiendo que la API devuelve token y user_id
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
    const response = await api.post('/recuperar_contrasena', data);
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
    const response = await api.post('/reportar_situacion', data);
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
    const response = await api.get('/mis_situaciones');
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
    const response = await api.post('/cambiar_clave', data);
    if (response.data.exito) {
      return response.data;
    }
    throw new Error(response.data.mensaje || 'Error al cambiar contraseña');
  } catch (error) {
    handleError(error, 'Error al cambiar contraseña:');
  }
};