import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InventarioScreen from './src/screens/InventarioScreen';
import EscanearScreen from './src/screens/EscanearScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inventario" component={InventarioScreen} />
        <Tab.Screen name="Escanear" component={EscanearScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}