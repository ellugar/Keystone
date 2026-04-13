import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import InventarioScreen from '../screens/InventarioScreen';
import EscanearScreen from '../screens/EscanearScreen';
import AlertasScreen from '../screens/AlertasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inventario" component={InventarioScreen} />
        <Tab.Screen name="Escanear" component={EscanearScreen} />
        <Tab.Screen name="Alertas" component={AlertasScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}