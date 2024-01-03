import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useUserRegisterMutation, userIsLoged } from "../reducers/userReducer";
import { Button, Form, Stack } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";

function RegistrationScreen() {
    const [userRegister, { isLoading }] = useUserRegisterMutation();
    const [errorMssg, setErrorMssg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { userData } = useSelector((state) => state.user);

    const redirect =
        location.search && location.search !== ""
            ? location.search.split("=")[1]
            : "/";

    useEffect(() => {
        if (userData) {
            navigate(redirect);
            return;
        }
    }, [userData, redirect, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        userRegister({ first_name, last_name, username, email, password })
            .unwrap()
            .then((res) => {
                if (res.error) {
                    setErrorMssg(res.error.error);
                    return;
                }
                localStorage.setItem("userData", JSON.stringify(res));
                dispatch(userIsLoged(res));
                setErrorMssg("");
            })
            .catch((error) => {
                setErrorMssg(
                    error?.data?.detail ||
                        error?.data?.error ||
                        error.toString()
                );
            });
    };

    const confirmPasswordCheck = (passwordCheck) => {
        if (passwordCheck === "" && passwordCheck === undefined) {
            setErrorMssg("Please confirm your password");
            return false;
        }

        if (passwordCheck === password) {
            setErrorMssg("");
            return true;
        } else {
            setErrorMssg("Password don't match.");
            return false;
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {errorMssg !=="" && (
                <Message variant={"danger"}>{errorMssg}</Message>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={first_name}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            setErrorMssg("");
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={last_name}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setErrorMssg("");
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMssg("");
                        }}
                    />
                </Form.Group>
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
                <Form.Group controlId="cPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={cPassword}
                        onChange={(e) => {
                            setErrorMssg("");
                            setCPassword(e.target.value);
                            confirmPasswordCheck(e.target.value);
                        }}
                        onBlur={(e) => {
                            setErrorMssg("");
                            confirmPasswordCheck(e.target.value);
                        }}
                    />
                </Form.Group>
                <Stack direction="horizontal" className="my-3" gap={3}>
                    <Button className="" variant="light">
                        Go back
                    </Button>
                    <Button
                        disabled={
                            username === "" ||
                            password === "" ||
                            cPassword === "" ||
                            first_name === "" ||
                            last_name === "" ||
                            email === "" ||
                            errorMssg !==""
                        }
                        className="ms-auto"
                        type="submt"
                        variant="primary"
                    >
                        Register
                    </Button>
                </Stack>
            </Form>
        </FormContainer>
    );
}

export default RegistrationScreen;
