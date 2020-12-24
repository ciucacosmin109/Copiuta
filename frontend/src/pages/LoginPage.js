import React from 'react';
import Login from '../data/Login'; 
import config from '../config.json' 

import { Form, Button, Spinner, Alert, Card } from 'react-bootstrap'; 
import { GoogleLogin } from 'react-google-login';
import './LoginRegisterPage.css';
//import {urlAfterLogin} from '../data/Axios';
 
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            email: '',
            password: '',
             
            loading: false,
            error: null
        };
        
        console.log("Coming from: ", this.getPreviousUrl());
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    isEmailValid = email => {
        if(!email){
            return true
        }else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z.]+$/.test(email)) {
            return true;
        }else{
            return false;
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        // stop here if form is empty or invalid
        if (!email || !password) {
            return;
        }
        if(!this.isEmailValid(email)){
            return;
        }

        this.setState({ loading: true });
        Login.login(email, password).then(res => {
            if(res.ok){
                this.setState({error: null, loading: false}); 
                this.props.updatePrivateRoutes();
                 
                const from = this.getPreviousUrl(); 
                this.props.history.replace(from); 
            }else{
                this.setState({error: res.message, loading: false});
            } 
        });
    }
    handleRegister = e => { 
        const url = this.getPreviousUrl();
        this.props.history.replace({pathname: '/register', state: { from: url}});
        //this.props.history.replace('/register')
    } 
    getPreviousUrl = () => { // or 'from' object
        if(this.props.location.state && this.props.location.state.from){
            return this.props.location.state.from;
        }else if(window.history.state && window.history.state.previousUrl){
            return window.history.state.previousUrl;
        }else{
            return { pathname: "/" };
        } 
    } 

    handleGoogleLoginSuccess = googleData => { 
        this.setState({ loading: true });
        Login.googleLogin(googleData.tokenId).then(res => {
            if(res.ok){
                this.setState({error: null, loading: false}); 
                this.props.updatePrivateRoutes();
                 
                const from = this.getPreviousUrl(); 
                this.props.history.replace(from); 
            }else{
                this.setState({error: res.message, loading: false});
            } 
        });
    }
    handleGoogleLoginFailure = googleData => {
        console.log('error',googleData)
    }

    render() { 
        return (
            <div id="Marius">
            <Card> 
                <Card.Header>Login</Card.Header> 
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleChange}

                                type="email" 
                                placeholder="Enter email"   

                                isInvalid={!this.isEmailValid(this.state.email)} 
                                required />
                                     
                            <Form.Control.Feedback type="invalid">
                                Invalid email !
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleChange}

                                type="password" 
                                placeholder="Password" 
                                required />
                        </Form.Group>
    
                        <Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={this.state.loading} > 
        
                                {this.state.loading ? 
                                    <>
                                        <Spinner 
                                            animation="border"
                                            size="sm"
                                        /> 
                                        {' Loading ...'}
                                    </>
                                    : 'Login'
                                }
                            </Button>
                            <Button 
                                className="right-button"
                                variant="link" 
                                onClick={this.handleRegister}> 
                                
                                Don't have an account ? (register)
                            </Button>
                        </Form.Group>
 
                        {this.state.error != null ? 
                            <Alert style={{margin: 0}} variant='danger'>{this.state.error}</Alert>
                            :<></>
                        } 
                        
                    </Form>
                </Card.Body> 
                <Card.Footer> 
                    <div className="disabled-text-button">External login</div>
                    <GoogleLogin className="social-login right-button"
                        clientId={config.googleLogin.clientId}
                        buttonText="Log in with @stud.ase.ro"
                        onSuccess={this.handleGoogleLoginSuccess}
                        onFailure={this.handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </Card.Footer>  
            </Card>
            </div>
        );
    }
}

export default LoginPage; 