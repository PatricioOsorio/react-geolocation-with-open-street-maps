# Implementación de servicios de Geolocalización (Open Street Maps)

## Requerimientos

Desarrolla una aplicación web donde implementes una librería de geolocalización (según la librería previamente asignada por equipo) considerando los siguientes puntos:

- El mapa debe mostrar 5 nodos fijos conforme a las ubicaciones solicitadas en la tarea titulada "Implementación de servicios de Geolocalización".
- Agrega una función que permita el trazado de rutas entre dos puntos dentro del mapa, la cual tiene que permitirle al usuario identificar los dos puntos en el mapa y poderlos modificar en cualquier momento al dar click dentro del componente en algún punto específico o a través de la introducción de coordenadas en un textinput.
- Respaldar su proyecto en cualquier repositorio basado en GIT.
- Documentar todo el proceso de desarrollo dentro del archivo README del repositorio de manera detallada.
- Compartir liga del repositorio para su evaluación.

## Recursos usados

### Nominatim (para la consulta de los datos)

Nominatim utiliza datos de OpenStreetMap para encontrar ubicaciones en la Tierra por nombre y dirección (geocodificación). También puede hacer lo contrario, encontrar una dirección para cualquier ubicación en el planeta.

#### Caracteristicas

- Buscar lugares por nombre o dirección (Geocodificación)
- Buscar direcciones de un lugar (Geocodificación inversa)
- Instalación escalable
- Instalación configurable
- Siempre actualizado con OpenStreetMap
- Rápido

#### Enlaces

- [Enlace del repositorio](https://github.com/osm-search/Nominatim 'Nominatim').

- [Enlace de la documentacion](https://nominatim.org/release-docs/latest/ 'Nominatim').

### Leaflet.js (para mostrar el mapa)

Leaflet.js es una biblioteca independiente que se utiliza para la visualización y la interacción con mapas.

#### Caracteristicas

- Interactividad: Leaflet permite crear mapas interactivos que los usuarios pueden explorar y manipular fácilmente.
- Personalización: Los mapas pueden ser altamente personalizables, desde el estilo visual hasta la interacción del usuario.
- Compatibilidad: Leaflet es compatible con dispositivos móviles y navegadores web modernos.
- Plugins: Hay una gran cantidad de complementos disponibles que extienden las funcionalidades de Leaflet, permitiendo integraciones con diversas tecnologías y servicios.

#### Enlaces

- [Enlace del repositorio](https://github.com/Leaflet/Leaflet 'Leaflet').

- [Enlace de la documentacion](https://leafletjs.com/index.html 'Leaflet').

## Instalacion del proyecto actual

1. Clonar el repositorio, en la consola ejecutar el siguiente comando: `git clone [repositorio]`
1. Abrir la consola de comandos en el directorio donde se encuentre el proyecto
1. Para instalar las dependecias, Ejecutar el siguiente comando: `npm install`
1. Para ejecutar el proyecto, ejecutar el siguiente comando: `npm run dev`

## Ejemplo funcionando

[Enlace del ejemplo](https://patricioosorio.github.io/implementation-geolocation-with-open-street-maps/ 'Website')

## Dependencias del proyecto

- Bootstrap: `npm install bootstrap` (para los estilos del sitio)
- Leaflet: `npm install leaflet` (para mostrar el mapa)
- leaflet-routing-machine: `npm install leaflet-routing-machine` (para mostrar el mapa con la posibilidad de habilitar el enrutamiento por medio de coordenadas)

## Descripcion de los componentes usados

### main.jsx

- Se importan los estilos de bootstrap y estilos personalizados
- Se importa el componente App `App`

### App.jsx

- Se importan los componente del layout
- Declara la inferfaz del sitio, con el `Header`, `Hero`, `Main` y `Footer`

### Hedear.jsx

- Continene la estructura del Hedaer del sitio.

### Hero.jsx

- Continen informaicon general de la especificacion del sitio.

### Footer.jsx

- Footer del sitio web.

### Main.jsx

- Importa y muestra los componentes:
  - `RoutingRoutes`: Componente para el trazado de rutas.
  - `Geolocation`: Componente para la busqueda de ubicaciones.

### RoutingRoutes.jsx

- Tiene componentes de:
- `SearchForm`: componente de busqueda con un formulario reutilizable.
- `LocationList`: componente que muestra la lista de las locaciones encontradas.
- `RoutingRoutes`: componente principal, con varios estados, manejador de formulario par su correcto funcionamiento, usando un helper personalizado para las peticiones Http. Tambien se renderiza el componente `MyMapLeaflet` con parametros definidos para mostrar el mapa.

### Geolocation.jsx

- Contiene estados para el manejo del formulario, contiene ubicaciones por defecto, y la posibilidad de que el usuario ingrese en un Input una busqueda personalizada. Tambien se renderiza el componente `MyMapLeaflet` con parametros definidos para mostrar el mapa.

### MyMapLeaflet.jsx

- Renderiza el mapa con la ubicacion o ubicaciones que se pasan por parametros.
