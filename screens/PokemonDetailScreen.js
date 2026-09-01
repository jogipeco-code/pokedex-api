import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function PokemonDetailScreen({ route }) {
  // "url" llega como parámetro desde la pantalla de lista
  const { url } = route.params;
  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDetalle() {
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        setDetalle(datos);
      } catch (err) {
        console.log(err);
      } finally {
        setCargando(false);
      }
    }
    cargarDetalle();
  }, [url]);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!detalle) {
    return (
      <View style={styles.centrado}>
        <Text>No se encontró información</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Image
        style={styles.imagen}
        source={{ uri: detalle.sprites.front_default }}
      />
      <Text style={styles.nombre}>{detalle.name}</Text>
      <View style={styles.filaTipos}>
        {detalle.types.map((t) => (
          <View key={t.type.name} style={styles.chip}>
            <Text style={styles.chipTexto}>{t.type.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.dato}>Peso: {detalle.weight}</Text>
      <Text style={styles.dato}>Altura: {detalle.height}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', paddingTop: 30 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagen: { width: 150, height: 150 },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  filaTipos: { flexDirection: 'row', marginTop: 10 },
  chip: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  chipTexto: { textTransform: 'capitalize' },
  dato: { fontSize: 16, marginTop: 6 },
});
