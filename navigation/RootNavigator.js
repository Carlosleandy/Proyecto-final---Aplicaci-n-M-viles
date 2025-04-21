import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar todas las pantallas necesarias
import HomeScreen from '../screens/HomeScreen';
import ReportSituationScreen from '../screens/ReportSituationScreen';
import MapScreen from '../screens/MapScreen';
import SituationMapScreen from '../screens/SituationMapScreen';
import SheltersScreen from '../screens/SheltersScreen';
import PreventiveMeasuresScreen from '../screens/PreventiveMeasuresScreen';
import ServicesScreen from '../screens/ServicesScreen';
import NewsScreen from '../screens/NewsScreen';
import MySituationsScreen from '../screens/MySituationsScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import MembersScreen from '../screens/MembersScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportSituationScreen"
          component={ReportSituationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SituationMapScreen"
          component={SituationMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SheltersScreen"
          component={SheltersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreventiveMeasuresScreen"
          component={PreventiveMeasuresScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServicesScreen"
          component={ServicesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MySituationsScreen"
          component={MySituationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VolunteerScreen"
          component={VolunteerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MembersScreen"
          component={MembersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecoverPasswordScreen"
          component={RecoverPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;