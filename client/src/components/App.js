import React from 'react';
import Apollo from './Apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import NoMatch from './NoMatch';

export default () => (
  <Apollo>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Apollo>
);
