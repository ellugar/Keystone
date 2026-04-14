import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import InventarioScreen from './src/screens/InventarioScreen';
import EscanearScreen from './src/screens/EscanearScreen';
import PerfilScreen from './src/screens/PerfilScreen.jsx';
import OrganizacionPerfilScreen from './src/screens/OrganizacionPerfilScreen.jsx';
import AlertScreen from './src/screens/AlertasScreen.jsx';
import NotificacionesScreen from './src/screens/NotificacionesScreen';
import DonacionesScreen from './src/screens/DonacionesScreen';

// Context & Theme
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { COLORS } from './src/theme';

const Tab = createBottomTabNavigator();

// Navigator para usuarios normales
function UserNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inventario') {
            iconName = focused ? 'inventory-2' : 'inventory-2';
          } else if (route.name === 'Escanear') {
            iconName = focused ? 'qr-code-scanner' : 'qr-code-scanner';
          } else if (route.name === 'Alertas') {
            iconName = focused ? 'notifications' : 'notifications-none';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen
        name="Inventario"
        component={InventarioScreen}
        options={{ title: 'Inventario' }}
      />
      <Tab.Screen
        name="Escanear"
        component={EscanearScreen}
        options={{ title: 'Escanear' }}
      />
      <Tab.Screen
        name="Alertas"
        component={AlertScreen}
        options={{ title: 'Alertas' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

// Navigator para organizaciones
function OrganizationNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Donaciones') {
            iconName = focused ? 'volunteer-activism' : 'volunteer-activism';
          } else if (route.name === 'Notificaciones') {
            iconName = focused ? 'notifications' : 'notifications-none';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen
        name="Donaciones"
        component={DonacionesScreen}
        options={{ title: 'Donaciones' }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{ title: 'Notificaciones' }}
      />
      <Tab.Screen
        name="Perfil"
        component={OrganizacionPerfilScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

// Componente main que usa el contexto de autenticación
function AppNavigator() {
  const { user, userType } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      {userType === 'organizacion' ? (
        <OrganizationNavigator />
      ) : (
        <UserNavigator />
      )}
    </NavigationContainer>
  );
}

// Componente raíz
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}