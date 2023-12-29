import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useUserLogInMutation, userIsLoged } from "../reducers/userReducer";
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';

function LoginScreen() {
    const [userLogIn, { isLoading, isError }] = useUserLogInMutation();
    const [errorMssg, setErrorMssg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {userData} = useSelector((state) => state.user);

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
                dispatch(userIsLoged(res))
            })
            .catch((error) => {
                setErrorMssg(error?.data?.detail || error);
            });
    };

    useEffect(() => {
        console.log(userData);
        if (userData) {
            navigate(redirect);
            return;
        }
    }, []);

    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {errorMssg != "" && (
                    <Message variant={"danger"}>{errorMssg}</Message>
                )}
                {isLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
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
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMssg("");
                            }}
                        />
                    </Form.Group>
                    <Button
                        disabled={username === "" && password === ""}
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