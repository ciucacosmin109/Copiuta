import React from 'react';
import Login from '../data/Login';

import { Form, Button, Spinner, Alert, Card, Col } from 'react-bootstrap';
import './LoginRegisterPage.css';
 
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmed: '',
             
            loading: false,
            error: null
        };
 
        console.log("Coming from: ", this.getPreviousUrl());
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    isNameValid = (name) => {
        if(!name){
            return true
        }else if (/^[a-zA-Z]+$/.test(name)) {
            return true;
        }else{
            return false;
        }
    }
    isEmailValid = (email, test) => {
        if(!email){
            return true
        }else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z.]+$/.test(email)) {
            return true;
        }else{
            if(!test) this.setState({error: "The email is not valid"});
            return false;
        }
    }
    isPasswordValid = (pass, conf) => {
        if(!pass){
            return true
        }else if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/.test(pass)) {
            if(pass === conf){
                return true;
            }
            
            this.setState({error: "The passwords must match"});
            return false;
        }else{
            this.setState({error: "The password must contain atleast 1 uppercase 1 lowercase and 1 number"});
            return false;
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({error: null});

        const { firstName, lastName, email, password, passwordConfirmed } = this.state;

        // Stop here if the form is empty or invalid
        if (!firstName || !lastName || !email || !password || !passwordConfirmed) {
            return;
        }
        if( !this.isEmailValid(email) || 
            !this.isNameValid(firstName) || 
            !this.isNameValid(lastName) ||
            !this.isPasswordValid(password, passwordConfirmed)){
            return;
        }

        // Make the API request
        this.setState({ loading: true });
        Login.register(firstName, lastName, email, password).then(res => {
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
    handleLogin = e => {
        const url = this.getPreviousUrl();
        this.props.history.replace({pathname: '/login', state: { from: url}});
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

    render() { 
        return (
            <div id="Marius">
            <Card> 
                <Card.Header>Register</Card.Header> 
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>First name</Form.Label>
                                <Form.Control 
                                    name="firstName" 
                                    value={this.state.firstName} 
                                    onChange={this.handleChange}

                                    type="text" 
                                    placeholder="First name"   

                                    isInvalid={!this.isNameValid(this.state.firstName)} 
                                    required />
                                            
                                <Form.Control.Feedback type="invalid">
                                    Invalid first name !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control 
                                    name="lastName" 
                                    value={this.state.lastName} 
                                    onChange={this.handleChange}

                                    type="text" 
                                    placeholder="Last name"   

                                    isInvalid={!this.isNameValid(this.state.lastName)} 
                                    required />
                                            
                                <Form.Control.Feedback type="invalid">
                                    Invalid last name !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleChange}

                                type="email" 
                                placeholder="Enter email"   

                                isInvalid={!this.isEmailValid(this.state.email,true)} 
                                required />
                            
                            {this.isEmailValid(this.state.email,true) ? 
                                <Form.Text className="text-muted">
                                    Your email will not be shared with anyone else :D
                                </Form.Text> 
                                : 
                                <Form.Control.Feedback type="invalid">
                                    Invalid email !
                                </Form.Control.Feedback>
                            }            
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
                            <Form.Label>Confirm password (I'm sorry, but I have to do this :)</Form.Label>
                            <Form.Control 
                                name="passwordConfirmed" 
                                value={this.state.passwordConfirmed} 
                                onChange={this.handleChange}

                                type="password" 
                                placeholder="Confirm password" 
                                required />
                        </Form.Group>
    
                        <Form.Group>
                            <Button 
                                variant="success" 
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
                                    : 'Register'
                                }
                            </Button>
                            <Button 
                                className="right-button"
                                variant="link" 
                                onClick={this.handleLogin}> 
                                
                                Already have an account ? (login)
                            </Button>
                        </Form.Group>
 
                        {this.state.error != null ? 
                            <Alert style={{margin: 0}} variant='danger'>{this.state.error}</Alert>
                            :<></>
                        } 
                        
                    </Form>
                </Card.Body>  
            </Card>
            </div>
        );
    }
}

export default RegisterPage; 