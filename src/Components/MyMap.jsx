import React, { useEffect } from 'react';
import * as maptalks from 'maptalks';
import 'maptalks/dist/maptalks.css';

const MyMap = () => {
  useEffect(() => {
    const map = new maptalks.Map('my-map', {
      center: [0, 0],
      zoom: 2,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate:
          'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution:
          '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
          '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
    });

    // Cleanup the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return <div style={{ width: '800px', height: '600px' }} id="my-map"></div>;
};

export default MyMap;
