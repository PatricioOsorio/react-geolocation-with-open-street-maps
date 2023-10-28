import React from 'react';
import RoutingRoutes from './RoutingRoutes';
import Geolocation from './Geolocation';
import Form from './Form';

const Main = () => {
  return (
    <>
      <RoutingRoutes />
      <Geolocation />
      <Form />
    </>
  );
};

export default Main;
