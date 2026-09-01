# Pokédex App

App móvil construida con **React Native** y **Expo** que consume la [PokéAPI](https://pokeapi.co/) para mostrar un listado de Pokémon con buscador y una pantalla de detalle con su información.

Proyecto de práctica enfocado en aplicar los conceptos fundamentales de React Native: navegación entre pantallas, consumo de una API REST, manejo de estado con hooks, y renderizado eficiente de listas.

## Funcionalidades

- Listado de 50 Pokémon obtenidos en tiempo real desde la PokéAPI.
- Buscador que filtra la lista por nombre a medida que escribes.
- Pantalla de detalle con imagen, tipos, peso y altura de cada Pokémon.
- Navegación entre pantallas con paso de parámetros.

## Stack técnico

| Herramienta | Uso |
|---|---|
| [Expo](https://expo.dev) | Entorno de desarrollo y build (managed workflow) |
| React Native 0.81 | Framework base |
| [React Navigation](https://reactnavigation.org/) (native stack) | Navegación entre pantallas |
| [PokéAPI](https://pokeapi.co/) | Fuente de datos (pública, sin autenticación) |

## Estructura del proyecto

```
pokedex-api/
├── index.js                     # Punto de entrada: registra App.js como componente raíz
├── App.js                       # Configuración de navegación (Stack Navigator)
├── app.json                     # Configuración de Expo (nombre, ícono, splash, etc.)
├── package.json                 # Dependencias y scripts
├── screens/
│   ├── PokemonListScreen.js     # Pantalla 1: lista + buscador
│   └── PokemonDetailScreen.js   # Pantalla 2: detalle de un Pokémon
├── assets/                      # Íconos e imágenes de la app
└── .vscode/                     # Configuración del editor (opcional)
```

## Cómo correrlo

### Requisitos

- Node.js (LTS)
- npm
- Para probar en simulador/emulador: Xcode (iOS) y/o Android Studio (Android), ya configurados con al menos un simulador/emulador creado.

### Instalación

```bash
git clone https://github.com/jogipeco-code/pokedex-api.git
cd pokedex-api
npm install
```

### Ejecución

```bash
npx expo start
```

En el menú que aparece en la terminal:
- Presiona `i` para abrir el Simulador de iOS.
- Presiona `a` para abrir el Emulador de Android.
- O escanea el código QR con la app **Expo Go** en un dispositivo físico.

## Notas importantes

- **No ejecutar `npm run reset-project`.** Ese script viene de la plantilla original de Expo y mueve todo el código actual a una carpeta `app-example`, dejando el proyecto en blanco.
- La carpeta `src/` contiene rutas de Expo Router que quedaron de la plantilla inicial y **no se usan** — el punto de entrada real es `index.js` → `App.js`. Es seguro ignorarla o eliminarla.

## Posibles mejoras futuras

- Favoritos persistentes con `AsyncStorage`.
- Paginación infinita en lugar de un límite fijo de 50 Pokémon.
- Manejo de errores más robusto (reintentos, distinguir sin conexión de fallo del servidor).

## Licencia

MIT — ver [LICENSE](./LICENSE).
