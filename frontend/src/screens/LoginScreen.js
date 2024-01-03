import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useUserLogInMutation } from "../reducers/userReducer";
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useSelector } from 'react-redux';

function LoginScreen() {
    const [userLogIn, { isLoading }] = useUserLogInMutation();
    const [errorMssg, setErrorMssg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search && location.search !== "" ? location.search.split("=")[1] : "/" ;
    
    const submitHandler = (e) => {
        e.preventDefault();
        userLogIn({ username, password })
            .unwrap()
            .then((res) => {
                if (res.error) {
                    setErrorMssg(res.error.error);
                    return;
                }
                localStorage.setItem("userData", JSON.stringify(res));
                // dispatch(userIsLoged(res));
                setErrorMssg("");
            })
            .catch((error) => {
                setErrorMssg(error?.data?.detail || error);
            });
    };

    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (userData) {
            navigate(redirect);
            return;
        }
    }, [userData]);

    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {errorMssg !== "" && (
                    <Message variant={"danger"}>{errorMssg}</Message>
                )}
                {isLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrorMssg("");
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={type}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrorMssg("");
                                }}
                            />
                            <Button variant='dark'><i className={`fas fa-${type === "password" ? "eye":"eye-slash"}`} onClick={(e) => setType(type === "password" ? "text" : "password")}></i></Button>
                        </InputGroup>
                    </Form.Group>
                    <Button
                        disabled={username === "" || password === ""}
                        className="my-3"
                        type="submt"
                        variant="primary"
                    >
                        Sign in
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : "/register"
                            }
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
}

export default LoginScreen