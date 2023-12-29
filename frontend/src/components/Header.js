import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
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
        naviaget("/login");
        dispatch(userLogout());
    }

    return (
        <header>
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
                                    <Nav.Link onClick={(e) => logOutHandler(e)}>
                                        <i className="fas fa-right-from-bracket"></i>Logout
                                    </Nav.Link>
                                )}
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
