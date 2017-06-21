import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import App from './components/App.jsx';
import PoliticianProfile from './containers/PoliticianProfile.jsx';
import DisplayAndPoliticians from './containers/DisplayAndPoliticians.jsx';
import Homepage from './containers/Homepage.jsx';
import About from './containers/About.jsx';

let indexRedirectTarget = '/home';
if (sessionStorage.state){
  indexRedirectTarget = '/politicians';
}

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to={indexRedirectTarget} />
      <Route path="/home" component={Homepage} />
      <Route path="/politicians" component={DisplayAndPoliticians} />
      <Route path="/politicians/:id" component={PoliticianProfile} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
);
