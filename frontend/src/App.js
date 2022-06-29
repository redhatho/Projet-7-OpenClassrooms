import React from 'react';
import './styles/App.css';
import Router from './Routes/Router';
import Header from './components/Header';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
