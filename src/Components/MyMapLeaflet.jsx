import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import PropTypes from 'prop-types';

let mapIdCounter = 0;

const MyMap = ({ lat, lon, zoom, endLat, endLon }) => {
  const mapId = `map-${mapIdCounter++}`;

  useEffect(() => {
    const map = L.map(mapId).setView([lat, lon], zoom);

    // Agrega el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );

    // Agrega el marcador en el mapa, con la latitud y longitud
    L.marker([lat, lon]).addTo(map);

    // Crea el control de enrutamiento, solo cuando hay coordenadas de la 2 ubicacion
    if (endLat !== null && endLon !== null) {
      L.Routing.control({
        waypoints: [
          L.latLng(lat, lon), // Punto de partida (latitud, longitud)
          L.latLng(endLat, endLon), // Punto de partida (latitud, longitud)
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
  }, [lat, lon, zoom, endLat, endLon]); // Cuando cambia lat, lon o zoom, vuelve a ejecutar el effect

  return (
    <div
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      id={mapId}
    ></div>
  );
};

MyMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  endLat: PropTypes.number,
  endLon: PropTypes.number,
};

MyMap.defaultProps = {
  lat: 0,
  lon: 0,
  zoom: 5,
  endLat: null,
  endLon: null,
};

export default MyMap;
