import React from 'react';
import { BrowserRouter as Router, Switch/*, Route*/ } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute';
import Login from './data/Login';

import routes from './routes'

class App extends React.Component { 
  render() { 
    const isLoggedIn = document.cookie.includes("isLoggedIn");
    
    return (
      <Router>
        <Switch>
          {routes.map((route, index) => ( 
            <PrivateRoute key={index} 
              path={route.path} 
              exact={true} 
              isLoggedIn={route.private ? isLoggedIn : true}
              component={route.component} 
            />
          ))} 
        </Switch>
      </Router>
    );
  }
}

export default App;
