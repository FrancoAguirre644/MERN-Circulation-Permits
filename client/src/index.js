import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import { DataProvider } from './store/GlobalState'

ReactDOM.render(
  <DataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataProvider>
  , document.getElementById('root'));

serviceWorker.unregister();