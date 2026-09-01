import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={PokemonListScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="Detalle"
          component={PokemonDetailScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
