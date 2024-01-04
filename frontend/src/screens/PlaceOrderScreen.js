import React from "react";
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
import { useSelector } from "react-redux";

function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;

    let itemsPrice = cartItems.reduce(
        (acc, item) => acc + item.Qty * item.price,
        0,
    );

    let shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);

    let taxPrice = parseInt(0.082 * itemsPrice).toFixed(2);

    let totalPrice = parseFloat(itemsPrice + shippingPrice + taxPrice).toFixed(2); 

    const placeOrder = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Place Order</h1>
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
                                {cartItems.map((item, index) => (
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
                                        disabled={cartItems.length == 0}
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
