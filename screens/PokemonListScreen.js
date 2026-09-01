import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

export default function PokemonListScreen({ navigation }) {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // useEffect con [] = se ejecuta una sola vez, al montar el componente
  useEffect(() => {
    async function cargarPokemones() {
      try {
        const respuesta = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        );
        const datos = await respuesta.json();
        setPokemones(datos.results);
      } catch (err) {
        setError('No se pudo cargar la lista de Pokémon');
      } finally {
        setCargando(false);
      }
    }
    cargarPokemones();
  }, []);

  // Filtro en memoria sobre lo ya cargado (sin volver a pedir a la API)
  const pokemonesFiltrados = pokemones.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // La PokeAPI no da el id directo en el listado, lo sacamos de la URL
  const obtenerIdDesdeUrl = (url) => {
    const partes = url.split('/').filter(Boolean);
    return partes[partes.length - 1];
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={pokemonesFiltrados}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const id = obtenerIdDesdeUrl(item.url);
          return (
            <TouchableOpacity
              style={styles.fila}
              onPress={() =>
                navigation.navigate('Detalle', {
                  nombre: item.name,
                  url: item.url,
                })
              }
            >
              <Image
                style={styles.imagenMini}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                }}
              />
              <Text style={styles.nombre}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 10,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imagenMini: { width: 40, height: 40, marginRight: 12 },
  nombre: { fontSize: 16, textTransform: 'capitalize' },
});
