import React, { useState } from 'react';
import MyMapLeaflet from './MyMapLeaflet';
import { helpHttp } from '../helpers/helpHttp';

const Form = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);
  const [inputCp, setInputCp] = useState('');

  const handleGetMyCurrentCp = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          reverseGeolocation(latitude, longitude);
          setCurrentLocation({ latitude, longitude, accuracy });
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        },
        // Opciones para la geolocalización
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('La geolocalización no está disponible en este navegador.');
    }
  };

  const reverseGeolocation = (lat, lon) => {
    const apiUrl = `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat},${lon}&language=es`;
    const headers = {
      'X-RapidAPI-Key': '8e448b8b19msh82bd7f3c9075be1p13ff08jsnfb74b8d0d5e5',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
    };
    helpHttp()
      .get(apiUrl, { headers })
      .then((res) => {
        const postalCodes = []; // Este array contendrá los códigos postales únicos
        const postalCodeSet = new Set(); // Utilizamos un Set para llevar un seguimiento de los códigos postales únicos

        res.results.forEach((item) => {
          if (item.postal_code && !postalCodeSet.has(item.postal_code)) {
            postalCodeSet.add(item.postal_code); // Agregamos el código postal al Set
            postalCodes.push(item.postal_code); // Agregamos el código postal al array
          }
        });

        console.log(postalCodes);
        setPostalCodes(postalCodes);
        setInputCp(postalCodes[0]);
      });
  };

  const handleSearchCp = (e) => {
    e.preventDefault();
    // Validaciones

    // Búsqueda
    const cp = e.target.cp.value;
    console.log(cp);

    const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?username=Phatho&country=MX&postalcode=${inputCp}`;
    helpHttp()
      .get(apiUrl)
      .then((res) => {
        console.log(res.postalCodes);
        setLocations(res.postalCodes);
      });
  };

  return (
    <div className="row my-5 p-3 rounded border shadow bg-white">
      <h2 className="text-gradient fw-semibold fs-1 my-4 text-center">
        Formulario
      </h2>

      <div className="card p-3">
        <h3>Punto de recoleccion</h3>
        <div className="row g-3 mb-5">
          <div className="col-12">
            <label htmlFor="cp" className="form-label fw-semibold">
              Código postal
            </label>
            <form className="input-group" onSubmit={(e) => handleSearchCp(e)}>
              <input
                type="text"
                className="form-control"
                id="cp"
                placeholder="12345"
                name="cp"
                value={inputCp}
                onChange={(e) => setInputCp(e.target.value)}
              />

              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search me-1"></i>Buscar CP
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleGetMyCurrentCp}
              >
                <i className="fas fa-map-marker-alt me-1"></i>Obtener mi CP
                actual
              </button>
            </form>
          </div>

          {locations && locations.length > 0 && (
            <>
              <div className="col-12">
                <label className="form-label fw-semibold" htmlFor="estado">
                  Estado
                </label>
                <input
                  id="estado"
                  type="text"
                  className="form-control"
                  disabled
                  value={locations[0].adminName1}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold" htmlFor="municipio">
                  Municipio / Alcaldía
                </label>
                <input
                  id="municipio"
                  type="text"
                  className="form-control"
                  disabled
                  value={locations[0].adminName2}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold" htmlFor="colonia">
                  Colonia
                </label>
                <select className="form-select" id="colonia">
                  {locations.map((item, index) => (
                    <option key={index} value={item.placeName}>
                      {item.placeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold" htmlFor="calle">
                  Calle
                </label>
                <input id="calle" type="text" className="form-control" />
              </div>
            </>
          )}
        </div>
      </div>

      <h3>Asignacion de almacén</h3>
      <div className="row g-3">
        <div className="col-md-2">
          <label htmlFor="region" className="form-label">
            Región
          </label>
          <input
            type="text"
            id="region"
            className="form-control"
            disabled
            readOnly
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="almacen" className="form-label">
            Almacén
          </label>
          <input
            type="text"
            id="almacen"
            className="form-control"
            disabled
            readOnly
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="ubicacionAlmacen" className="form-label">
            Ubicación del almacén
          </label>
          <input
            type="text"
            id="ubicacionAlmacen"
            className="form-control"
            disabled
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="contacto" className="form-label">
            Contacto
          </label>
          <input
            type="text"
            id="contacto"
            className="form-control"
            disabled
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            id="telefono"
            className="form-control"
            disabled
            readOnly
          />
        </div>
      </div>
      {/* {currentLocation && (
        <div className="mt-5">
          <p>Latitud: {currentLocation.latitude}</p>
          <p>Longitud: {currentLocation.longitude}</p>
          <p>Precisión: {currentLocation.accuracy} metros</p>
          <MyMapLeaflet
            lat={parseFloat(currentLocation.latitude)}
            lon={parseFloat(currentLocation.longitude)}
            zoom={parseInt(20)}
          />
        </div>
      )} */}
    </div>
  );
};

export default Form;
