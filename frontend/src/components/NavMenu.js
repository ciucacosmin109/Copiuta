import React, { Component } from 'react'; 
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
  
import Login from '../data/Login'; 

import './NavMenu.css';

export default class NavMenu extends Component { 
    constructor(props) {
        super(props);
 
        this.state = {
            accountName: "Student"
        };
    } 
    componentDidMount(){
        Login.getCurrentLoggedIn().then(res => {
            if(res.ok){
                this.setState({
                    accountName: res.stud.firstName + " " + res.stud.lastName
                });
            }
        });
    }

    renderItems() {
        return ( 
            <Nav className="mr-auto">
                <Nav.Link
                    href="/" 
                    active={(/*match*/_, location) => ["/", "/home"].includes(location.pathname)}  > 
                    Home
                </Nav.Link> 
            </Nav>
        );
    }
    render() {  
        return (<>
            <header>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="/">Copiuta</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"> 
                        {this.renderItems()}
                        <Nav>
                            <NavDropdown title={this.state.accountName} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/student/id">Account details</NavDropdown.Item> 
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>  
            </header> 
        </>);
    }
}
