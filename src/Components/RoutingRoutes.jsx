import React, { useEffect } from 'react';
import { useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import MyMapLeaflet from './MyMapLeaflet';

const RoutingRoutes = () => {
  const [firstLocations, setFirstLocations] = useState([]);
  const [secondLocations, setSecondLocations] = useState([]);

  const [firstSelectedUbication, setFirstSelectedUbication] = useState(null);
  const [secondSelectedUbication, setSecondSelectedUbication] = useState(null);

  const handleSearch = (query, isFistLocation = undefined) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${query}`;

    helpHttp()
      .get(apiUrl)
      .then((res) => {
        if (!res.err && res.length > 0) {
          // if (isFistLocation === null) setFirstLocations(res);

          if (isFistLocation) {
            // console.log(res);
            setFirstLocations(res);
          } else {
            console.log(res);
            setSecondLocations(res);
          }
        } else {
          console.error('Error en la solicitud API:', res);
        }
      });
  };

  const handleSubmit = (e, query) => {
    e.preventDefault();

    if (e.target.id === 'form-from') {
      handleSearch(query, true);
    }

    if (e.target.id === 'form-to') {
      handleSearch(query, false);
    }
  };

  const handleOptionSelect = (selectedLocation, isFirstSelected) => {
    if (isFirstSelected) {
      setFirstSelectedUbication(selectedLocation);
    } else {
      setSecondSelectedUbication(selectedLocation);
    }
  };

  return (
    <>
      <div className="row my-5 py-3 rounded shadow">
        <h2>Actividad 2: Trazado de rutas</h2>
        <div className="col-lg-6">
          <form
            id="form-from"
            onSubmit={(e) => handleSubmit(e, e.target.from.value)}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Inicio"
                name="from"
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search me-1"></i>Buscar
              </button>
            </div>
          </form>
          <div className="list-group mb-3">
            {firstLocations &&
              firstLocations.map((el) => (
                <button
                  type="button"
                  key={el.place_id}
                  className={`list-group-item list-group-item-action ${
                    firstSelectedUbication === el ? 'active' : ''
                  }`}
                  onClick={(e) => handleOptionSelect(el, true)}
                >
                  {el.display_name}
                </button>
              ))}
          </div>
        </div>

        <div className="col-lg-6">
          <form
            id="form-to"
            onSubmit={(e) => handleSubmit(e, e.target.to.value)}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Destino"
                name="to"
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search me-1"></i>Buscar
              </button>
            </div>
          </form>
          <div className="list-group mb-3">
            {secondLocations &&
              secondLocations.map((el) => (
                <button
                  type="button"
                  key={el.place_id}
                  className={`list-group-item list-group-item-action ${
                    secondSelectedUbication === el ? 'active' : ''
                  }`}
                  onClick={(e) => handleOptionSelect(el, false)}
                >
                  {el.display_name}
                </button>
              ))}
          </div>
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
    </>
  );
};

export default RoutingRoutes;
