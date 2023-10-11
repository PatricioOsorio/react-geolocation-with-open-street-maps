const Hero = () => {
  return (
    <div className="container my-5 rounded-3 bg-white">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis text-gradient">
            Servicios de Geolocalización con OpenStreetMaps
          </h1>
          <p className="lead">
            Implementar en equipos de trabajo un servicio de geolocalización
            dentro de una interfaz web, donde se incluya un frame que muestre de
            manera focalizada el estado de Puebla dentro de un mapa de la
            república mexicana, señalando los siguientes nodos por defecto:
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Universidad Tecnológica de Puebla{' '}
            </li>
            <li className="list-group-item">Catedral de la Cd. de Puebla</li>
            <li className="list-group-item">Fuerte de Loreto</li>
            <li className="list-group-item">Fuente de los Frailes</li>
          </ul>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img
            className="rounded-lg-3"
            src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
            alt=""
            width="720"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
