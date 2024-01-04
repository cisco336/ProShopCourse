import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    FormGroup,
    InputGroup,
    Form,
    Stack,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../reducers/cartReducer";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler} className="gap-3">
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address ? address : ""}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city ? city : ""}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country ? country : ""}
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                    />
                </Form.Group>
                <Stack className="my-3">
                    <Button className="ms-auto" type="submit" variant="primary">
                        Continue
                    </Button>
                </Stack>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
