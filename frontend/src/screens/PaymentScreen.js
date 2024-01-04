import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Col,
    Row,
    FormControl,
    FormGroup,
    InputGroup,
    Form,
    Stack,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../reducers/cartReducer";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    if (!shippingAddress.address) {
        navigate("/shipping")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/place-order");
    };
    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <FormContainer>
                <h1>Payment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Select method</Form.Label>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="PayPal"
                                    name="Payment method"
                                    value="PayPal"
                                    checked
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="Credit Card"
                                    name="Payment method"
                                    value="Credit Card"
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Stack className="my-3">
                        <Button
                            className="ms-auto"
                            type="submit"
                            variant="primary"
                        >
                            Continue
                        </Button>
                    </Stack>
                </Form>
            </FormContainer>
        </>
    );
}

export default PaymentScreen;
