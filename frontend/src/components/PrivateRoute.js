import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavMenu from './NavMenu';

export class PrivateRoute extends React.Component{  
    render(){ 
        let { component: MyComponent, ...rest } = this.props;

        return(
            <Route {...rest} render={ props => (
                rest.isLoggedIn
                    ? <>
                        {rest.navbar ? <NavMenu updatePrivateRoutes={rest.updatePrivateRoutes}/> : <></>} 
                        <MyComponent {...props} updatePrivateRoutes={rest.updatePrivateRoutes} />
                    </> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        );
    }
};

/*
export const PrivateRoute = ({ component: MyComponent, ...rest }) => {
    console.log("DRAW")
    return (
        <Route {...rest} render={ props => (
            rest.isLoggedIn
                ? <MyComponent {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    );
};
*/