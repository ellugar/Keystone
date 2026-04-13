import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InventarioScreen from './src/screens/InventarioScreen';
import EscanearScreen from './src/screens/EscanearScreen';
import ProfileScreen from './src/screens/PerfilScreen.jsx';
import AlertScreen from './src/screens/AlertasScreen.jsx';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inventario" component={InventarioScreen} />
        <Tab.Screen name="Escanear" component={EscanearScreen} />
        <Tab.Screen name="Alertas" component={AlertScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}