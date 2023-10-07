import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MyMap = ({ lat = 0, lon = 0, zoom, endLat = null, endLon = null }) => {
  useEffect(() => {
    const map = L.map('my-map').setView(
      [parseFloat(lat), parseFloat(lon)],
      zoom
    );

    // Agrega el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );

    // Agrega el marcador al centro del mapa
    L.marker([parseFloat(lat), parseFloat(lon)]).addTo(map);

    // Crea el control de enrutamiento, solo cuando hay coordenadas de la 2 ubicacion
    if (endLat !== null && endLon !== null) {
      L.Routing.control({
        waypoints: [
          L.latLng(parseFloat(lat), parseFloat(lon)), // Punto de partida (latitud, longitud)
          L.latLng(parseFloat(endLat), parseFloat(endLon)), // Punto de partida (latitud, longitud)
        ],
      }).addTo(map);
    }

    // Evita que se agregue una nueva ruta al hacer clic en el mapa
    map.on('click', (e) => {
      e.originalEvent.preventDefault();
    });

    // Limpia el mapa cuando el componente es desmontado
    return () => {
      map.remove();
    };
  }, [lat, lon, zoom, endLat, endLon]); // Cuando cambia lat, lot o zoom, vuelve a ejecutar el effect

  return (
    <div
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      id="my-map"
    ></div>
  );
};

export default MyMap;
