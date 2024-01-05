import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import {
    Stack,
    Button,
    Row,
    Col,
    Card,
    Image,
    ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from '../reducers/orderReducer';
import Loader from '../components/Loader';
import Message from "../components/Message";
import { clearCart } from '../reducers/cartReducer'
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../reducers/userReducer";

function PlaceOrderScreen() {
    const [createOrder, { isError, isSuccess, isLoading, error }] =
        useCreateOrderMutation();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);

    let itemsPrice = cartItems?.reduce(
        (acc, item) => acc + item.Qty * item.price,
        0,
    );
    let shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
    let taxPrice = parseInt(0.082 * itemsPrice).toFixed(2);
    let totalPrice = parseFloat(itemsPrice + shippingPrice + taxPrice).toFixed(
        2,
    );

    const placeOrder = (e) => {
        e.preventDefault();
        createOrder({
            user: user.userData,
            orderItems: cartItems,
            paymentMethod,
            taxPrice,
            shippingPrice,
            shippingAddress,
            totalPrice,
        })
        .then(response => {
            if (!response.error) {
                navigate(`/orders/${response.data._id}`)
            }
        });
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearCart());
        }
        if (error?.status && error?.status === 401) {
            dispatch(userLogout());
            setTimeout(() => navigate("/login"), 3000);
        }
        if (error) {
            // Handle other errors
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Place Order</h1>
            {isLoading && <Loader />}
            {isSuccess && <Message variant={"success"}>Order created.</Message>}
            {error && (
                <Message
                    variant={"danger"}
                >{`${error.message}. You will be redirected to the login page. Status code: ${error.status}`}</Message>
            )}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="flex-column">
                            <h1>Shipping</h1>
                            <p>{`${shippingAddress.address}, ${shippingAddress.postalCode}, ${shippingAddress.city}, ${shippingAddress.country}`}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="flex-column">
                            <h1>Payment Method</h1>
                            <p>{`${paymentMethod}`}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="flex-column">
                            <h1>Order Items</h1>
                            <ListGroup variant="flush">
                                {cartItems && cartItems?.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {`${item.Qty} x ${
                                                    item.price
                                                } = ${parseFloat(
                                                    parseInt(item.Qty) *
                                                        parseFloat(item.price),
                                                )}`}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <h1 className="p-3">Order Summary</h1>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Stack className="my-3">
                                    <Button
                                        disabled={cartItems?.length == 0}
                                        type="button"
                                        onClick={(e) => {
                                            placeOrder(e);
                                        }}
                                        variant="primary"
                                    >
                                        Place order
                                    </Button>
                                </Stack>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrderScreen;
