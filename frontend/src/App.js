import React from 'react';
import { BrowserRouter as Router, Switch/*, Route*/ } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute';
import Login from './data/Login';

import NavMenu from './components/NavMenu';

import routes from './routes'

class App extends React.Component {  
  
  updatePrivateRoutes = () => {
    this.setState({update: true});
  }

  render() { 
    const isLoggedIn = Login.isLoggedIn();
    
    return (
      <Router> 
        <Switch>
          {routes.map((route, index) => (  
            <PrivateRoute key={index} 
              path={route.path} 
              exact={true} 
              navbar={route.navbar}
              isLoggedIn={route.private ? isLoggedIn : true}
              updatePrivateRoutes = {this.updatePrivateRoutes}
              component={route.component} 
            /> 
          ))} 
        </Switch>
      </Router>
    );
  }
}

export default App;
