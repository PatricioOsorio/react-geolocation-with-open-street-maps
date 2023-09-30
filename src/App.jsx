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
        <div className="container">
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
