import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import MyMapLeaflet from './MyMapLeaflet';

const UBICATIONS = [
  'Puebla',
  'Universidad Tecnológica de Puebla',
  'Catedral de Puebla',
  'Fuerte de Loreto',
  'Fuente de los Frailes Puebla',
];

const Geolocation = () => {
  const [ubications, setUbications] = useState([]);
  const [boundingBox, setBoundingBox] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [zoom, setZoom] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUbication, setSelectedUbication] = useState(null);

  const handleSearch = (query) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${query}`;

    helpHttp()
      .get(apiUrl)
      .then((res) => {
        if (!res.err) {
          // console.log(res);
          setUbications(res);
          if (res.length > 0) {
            setLat(res[0].lat);
            setLon(res[0].lon);
            setZoom(res[0].place_rank);
            setBoundingBox(res[0].boundingbox);
          }
        } else {
          console.error('Error en la solicitud API:', res);
        }
      });
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    handleSearch(newText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  useEffect(() => {
    handleSearch('Puebla');
  }, []);

  useEffect(() => {
    if (selectedUbication) {
      // console.log(selectedUbication);
      setLat(selectedUbication.lat);
      setLon(selectedUbication.lon);
      setZoom(parseFloat(selectedUbication.place_rank) - 2);
      setBoundingBox(selectedUbication.boundingbox);
    }
  }, [selectedUbication]);

  const handleOptionSelect = (selectedLocation) => {
    setSelectedUbication(selectedLocation);
  };

  return (
    <div className="row my-5 py-3 rounded shadow">
      <h2>Actividad 1: Geolocalizacion</h2>

      <form className="col-lg-6" onChange={handleChange}>
        <div className="form-floating">
          <select className="form-select" id="defaults">
            {UBICATIONS.map((ubication) => (
              <option key={ubication}>{ubication}</option>
            ))}
          </select>
          <label htmlFor="defaults">Ubicaciones por defecto</label>
        </div>
      </form>

      <form className="col-lg-6" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Puebla ..."
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="floatingInput">Búsqueda</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      <div className="row">
        <div className="col-lg-3 bg-light p-2">
          <h2>Opciones</h2>
          <div className="list-group">
            {ubications &&
              ubications.map((el) => (
                <button
                  type="button"
                  key={el.place_id}
                  className={`list-group-item list-group-item-action ${
                    selectedUbication === el ? 'active' : ''
                  }`}
                  onClick={() => handleOptionSelect(el)}
                >
                  {el.display_name}
                </button>
              ))}
          </div>
        </div>

        <div className="col-lg-9">
          {boundingBox.length > 0 && (
            <MyMapLeaflet lat={lat} lon={lon} zoom={zoom} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Geolocation;
