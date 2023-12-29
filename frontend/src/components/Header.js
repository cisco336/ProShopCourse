import React from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'

function Header() {
    const { userData } = useSelector((state) => state.user);
    const naviaget = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("userData");
        dispatch(userLogout());
        naviaget("/login");
    }

    return (
        <Navbar
            bg="dark"
            variant="dark"
            sticky="top"
            expand="lg"
            collapseOnSelect
        >
            <Container>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to={"/cart"}>
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>Card
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/login"}>
                            {!userData ? (
                                <Nav.Link>
                                    <i className="fas fa-user"></i>Login
                                </Nav.Link>
                            ) : (
                                <NavDropdown
                                    title={`${userData.first_name} ${userData.last_name}`}
                                >
                                    <LinkContainer to={"/profile"}>
                                        <NavDropdown.Item>
                                            <i className="fas fa-user"></i>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={(e) => logOutHandler(e)}
                                    >
                                        <i className="fas fa-right-from-bracket"></i>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
