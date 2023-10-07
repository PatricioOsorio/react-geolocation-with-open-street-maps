import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>

      <main className="flex-shrink-0">
        <div className="p-5 text-center bg-body-tertiary">
          <div className="container py-5">
            <h1 className="text-body-emphasis">
              Implementación de servicios de Geolocalización
            </h1>
            <p className="col-lg-8 mx-auto lead">
              Implementar en equipos de trabajo un servicio de geolocalización
              dentro de una interfaz web, donde se incluya un frame que muestre
              de manera focalizada el estado de Puebla dentro de un mapa de la
              república mexicana, señalando los siguientes nodos por defecto:
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>Universidad Tecnológica de Puebla </li>
                <li className='list-group-item'>Catedral de la Cd. de Puebla</li>
                <li className='list-group-item'>Fuerte de Loreto</li>
                <li className='list-group-item'>Fuente de los Frailes</li>
              </ul>
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col"></div>
          </div>
          <Main />
        </div>
      </main>

      <footer className="d-block mt-auto py-3 bg-light">
        <Footer />
      </footer>
    </>
  );
}

export default App;
