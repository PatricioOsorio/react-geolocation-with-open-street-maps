import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Hero from './Components/Hero';

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>

      <main className="flex-shrink-0">
        <Hero/>
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
