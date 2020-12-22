import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from './routes'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, index) => ( 
            <Route key={index} path={route.path} exact={true}>
              <route.component />
            </Route>
          ))} 
        </Switch>
      </Router>
    );
  }
}

export default App;
