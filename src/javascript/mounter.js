import React from 'react';
import {render} from 'react-dom';
import "../scss/index.scss";
import App from './app-management/App';

render(
  <App />,
  document.querySelector('[data-app-mount]')
);