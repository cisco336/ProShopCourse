import React, { useEffect, useState } from "react";
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
import {
    useGetOrderDetailsQuery,
    useUpdateOrderPaidMutation,
} from "../reducers/orderReducer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearCart } from "../reducers/cartReducer";
import { useNavigate, useParams } from "react-router-dom";
import { userLogout } from "../reducers/userReducer";

function OrderScreen() {
    const params = useParams();
    const {
        data: orderDetails,
        isError: orderDetailsIsError,
        isSuccess: orderDetailsIsSuccess,
        isLoading: orderDetailsIsLoading,
        error: orderDetailsError,
    } = useGetOrderDetailsQuery(params.id);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);
    const [
        updateOrderPaid,
        {
            isError: orderPaidIsError,
            isLoading: orderPaidIsLoading,
            isSuccess: orderPaidIsSuccess,
            error: orderPaidError,
            data: orderPaidData,
        },
    ] = useUpdateOrderPaidMutation();

    let errorMessage = "";

    const clientID =
        "AZnvY2yGZ2_TXcMZGJQGqqqTt8_OaVQS-bRhUlLi2ayyJJjswNVjOQ8v25b1PHVJNPzcyAnTmlFr94c-";

    const successPaymentHandler = (e) => {
        e.preventDefault();
        updateOrderPaid(params.id)
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e)
            });
    };

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=USD`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (orderDetailsIsSuccess) {
            dispatch(clearCart());
        }
        if (orderDetailsError?.status && orderDetailsError?.status === 401) {
            dispatch(userLogout());
            setTimeout(() => navigate("/login"), 3000);
        }

        if (!orderDetails?.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [
        orderDetailsIsLoading,
        orderDetailsIsSuccess,
        orderDetailsIsError,
        params.id,
    ]);

    return (
        <>
            <h1>Order Details</h1>
            {orderDetailsIsLoading && <Loader />}
            {orderDetailsIsError && (
                <Message variant={"danger"}>{errorMessage}</Message>
            )}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="flex-column">
                            <h1>Shipping</h1>
                            <p>
                                <strong>
                                    Name: {orderDetails?.user?.first_name}{" "}
                                    {orderDetails?.user?.last_name}
                                </strong>
                            </p>
                            <p>
                                <strong>
                                    Email: {orderDetails?.user?.email}
                                </strong>
                            </p>
                            <p>{`${orderDetails?.shippingAddress.address}, ${orderDetails?.shippingAddress.postalCode}, ${orderDetails?.shippingAddress.city}, ${orderDetails?.shippingAddress.country}`}</p>
                            <Message
                                variant={`${
                                    orderDetails?.isDelivered
                                        ? "success"
                                        : "warning"
                                }`}
                            >
                                {orderDetails?.isDelivered
                                    ? `Delivered on ${orderDetails?.deliveredAt}`
                                    : "Not Delivered"}
                            </Message>
                        </ListGroup.Item>
                        <ListGroup.Item className="flex-column">
                            <h1>Payment Method</h1>
                            <p>{`${orderDetails?.paymentMethod}`}</p>
                            <Message
                                variant={`${
                                    orderDetails?.isPaid ? "success" : "warning"
                                }`}
                            >
                                {orderDetails?.isPaid
                                    ? `Paid on ${orderDetails?.paidAt}`
                                    : "Not Paid"}
                            </Message>
                        </ListGroup.Item>
                        <ListGroup.Item className="flex-column">
                            <h1>Order Items</h1>
                            <ListGroup variant="flush">
                                {orderDetails?.orderItems?.map(
                                    (item, index) => (
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
                                                    {`${item.qty} x ${
                                                        item.price
                                                    } = ${parseFloat(
                                                        parseInt(item.qty) *
                                                            parseFloat(
                                                                item.price,
                                                            ),
                                                    )}`}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ),
                                )}
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
                                    <Col>
                                        $
                                        {orderDetails &&
                                            orderDetails?.orderItems.reduce(
                                                (a, b) =>
                                                    a +
                                                    parseFloat(b.price * b.qty),
                                                0,
                                            )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Shipping:</Col>
                                    <Col>${orderDetails?.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Tax:</Col>
                                    <Col>${orderDetails?.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style={{ width: "100%" }}>
                                    <Col>Total:</Col>
                                    <Col>
                                        $
                                        {orderDetails &&
                                            (
                                                parseFloat(
                                                    orderDetails?.totalPrice,
                                                ) +
                                                parseFloat(
                                                    orderDetails?.taxPrice,
                                                )
                                            ).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;
