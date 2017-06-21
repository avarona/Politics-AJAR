'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store.jsx';
import Routes from './routes.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WebFont from 'webfontloader';

import 'bootstrap/dist/css/bootstrap.css';

WebFont.load({
  google: {
    families: ['Roboto', 'Cormorant', 'Lato', ]
  }
});

injectTapEventPlugin();

ReactDOM.render(
<MuiThemeProvider>
  <Provider store={store}>
    <Routes />
  </Provider>
 </MuiThemeProvider>,
  document.getElementById('origin')
);
