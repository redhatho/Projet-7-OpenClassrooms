import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
=======
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import reportWebVitals from './test/reportWebVitals';
>>>>>>> 7c099e386745837cb149b5e899a8b82f843bccc3

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);