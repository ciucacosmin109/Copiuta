import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import Login from '../data/Login';

import './NavMenu.css';

export default class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountName: "Student",
            studId: "id"
        };
    }
    componentDidMount() {
        Login.getCurrentLoggedIn().then(res => {
            if (res.ok) {
                this.setState({
                    accountName: res.stud.firstName + " " + res.stud.lastName,
                    studId: res.stud.id
                });
            }
        });
    }
    logout = async () => {
        await Login.logout();
        window.history.pushState({ previousUrl: window.location.pathname }, "", "/login");
        window.location.reload();
    }

    renderItems = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link
                    href="/courses"
                    active={(/*match*/_, location) => ["/", "/courses"].includes(location.pathname)}  >
                    Courses
                </Nav.Link>
                <Nav.Link
                    href="/groups"
                    active={(/*match*/_, location) => ["/groups"].includes(location.pathname)}  >
                    Groups
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
                            <NavDropdown alignRight title={this.state.accountName} id="collasible-nav-dropdown">
                                <NavDropdown.Item /*href={"/student/" + this.state.studId}*/>{"Student id: " + this.state.studId}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.logout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </>);
    }
}
