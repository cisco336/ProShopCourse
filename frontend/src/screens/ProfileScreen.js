import React, { useEffect, useState } from 'react';
import {
    useGetUserProfileQuery,
    userLogout,
    useUpdateUserProfileMutation,
    userIsLoged,
} from "../reducers/userReducer";
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, Stack, InputGroup } from "react-bootstrap";

function ProfileScreen() {
    const {data: userProfile, isFetching, isSuccess, isError} = useGetUserProfileQuery();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [updateProfile] = useUpdateUserProfileMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let canSave = false;

    useEffect(() => {
        if (isError) {
            dispatch(userLogout());
            navigate("/login")
        }
        if (isSuccess && userProfile) {
            setData(userProfile);
        }

    }, [userProfile, isFetching, isError, isSuccess, canSave]);

    const setData = (data) => {
        setEmail(data?.email);
        setFirstName(data?.first_name);
        setLastName(data?.email);
        setUsername(data?.username);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        updateProfile({ username, first_name, last_name, email, password })
            .then(res => {
                setData(res.data);
                dispatch(userIsLoged(res.data))
            })
            .catch(err => console.log(err));
    }

  return (
      <FormContainer>
          <h1>User Profile</h1>
          {isFetching && <Loader />}
          {isError && (
              <Message variant="danger">
                  An error ocurred when trying to get your profile
              </Message>
          )}
          <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={first_name}
                      onChange={(e) => {
                          setFirstName(e.target.value);
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
                      }}
                  />
              </Form.Group>
              <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      disabled
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                          setEmail(e.target.value);
                      }}
                  />
              </Form.Group>
              <Form.Group controlId="username">
                  <Form.Label>User Name</Form.Label>
                  <InputGroup>
                      <Form.Control
                          type="text"
                          placeholder="Enter user name"
                          value={username}
                          onChange={(e) => {
                              setUsername(e.target.value);
                          }}
                      />
                      <InputGroup.Text>{`Is ${
                          userProfile?.isAdmin ? "admin" : "not admin"
                      }`}</InputGroup.Text>
                  </InputGroup>
              </Form.Group>
              <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                          setPassword(e.target.value);
                      }}
                  />
              </Form.Group>
              <Stack direction="horizontal" className="my-3" gap={3}>
                  <Button className="" variant="dark" type="submit">
                      Save changes
                  </Button>
              </Stack>
          </Form>
      </FormContainer>
  );
}

export default ProfileScreen