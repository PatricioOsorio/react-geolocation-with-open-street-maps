import React, { useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import MyMapLeaflet from './MyMapLeaflet';

const SearchForm = ({ id, onSubmit, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          <i className="fas fa-search me-1"></i>Buscar
        </button>
      </div>
    </form>
  );
};

const LocationList = ({ locations, selectedLocation, onSelect }) => {
  return (
    <div className="list-group mb-3">
      {locations.map((el) => (
        <button
          type="button"
          key={el.place_id}
          className={`list-group-item list-group-item-action ${
            selectedLocation === el ? 'active' : ''
          }`}
          onClick={() => onSelect(el)}
        >
          {el.display_name}
        </button>
      ))}
    </div>
  );
};

const RoutingRoutes = () => {
  const [firstLocations, setFirstLocations] = useState([]);
  const [secondLocations, setSecondLocations] = useState([]);
  const [firstSelectedUbication, setFirstSelectedUbication] = useState(null);
  const [secondSelectedUbication, setSecondSelectedUbication] = useState(null);

  const handleSearch = (query, isFirstLocation) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${query}`;

    helpHttp()
      .get(apiUrl)
      .then((res) => {
        if (!res.err && res.length > 0) {
          if (isFirstLocation) {
            setFirstLocations(res);
          } else {
            setSecondLocations(res);
          }
        } else {
          console.error('Error en la solicitud API:', res);
        }
      });
  };

  const handleSubmit = (query, isFirstLocation) => {
    handleSearch(query, isFirstLocation);
  };

  const handleOptionSelect = (selectedLocation, isFirstSelected) => {
    if (isFirstSelected) {
      setFirstSelectedUbication(selectedLocation);
    } else {
      setSecondSelectedUbication(selectedLocation);
    }
  };

  return (
    <div className="row my-5 py-3 rounded shadow">
      <h2>Actividad 2: Trazado de rutas</h2>
      <div className="col-lg-6">
        <SearchForm
          id="form-from"
          onSubmit={(query) => handleSubmit(query, true)}
          placeholder="Inicio"
        />
        <LocationList
          locations={firstLocations}
          selectedLocation={firstSelectedUbication}
          onSelect={(el) => handleOptionSelect(el, true)}
        />
      </div>

      <div className="col-lg-6">
        <SearchForm
          id="form-to"
          onSubmit={(query) => handleSubmit(query, false)}
          placeholder="Destino"
        />
        <LocationList
          locations={secondLocations}
          selectedLocation={secondSelectedUbication}
          onSelect={(el) => handleOptionSelect(el, false)}
        />
      </div>

      <div className="col-12">
        {firstSelectedUbication && secondSelectedUbication && (
          <MyMapLeaflet
            lat={firstSelectedUbication.lat}
            lon={firstSelectedUbication.lon}
            endLat={secondSelectedUbication.lat}
            endLon={secondSelectedUbication.lon}
            zoom={parseFloat(firstSelectedUbication.place_rank) - 2}
          />
        )}
      </div>
    </div>
  );
};

export default RoutingRoutes;
