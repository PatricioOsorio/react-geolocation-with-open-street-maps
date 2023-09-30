import React, { useEffect } from 'react';
import * as maptalks from 'maptalks';
import 'maptalks/dist/maptalks.css';

const MyMap = ({ lat = 0, lon = 0, boundingBox, zoom }) => {
  useEffect(() => {
    const map = new maptalks.Map('my-map', {
      center: [parseFloat(lon), parseFloat(lat)],
      zoom: zoom,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate:
          'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
      }),
      layers: [new maptalks.VectorLayer('v')],
    });

    // Agrega el marcador al centro del mapa
    const marker = new maptalks.Marker([parseFloat(lon), parseFloat(lat)]).addTo(map.getLayer('v'));

    // Cleanup the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, [boundingBox]); // Re-run the effect when boundingBox changes

  return <div style={{ width: '100%', height: '100%', minHeight: '600px' }} id="my-map"></div>;
};

export default MyMap;
