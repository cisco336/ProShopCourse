import React from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Card, Button, ListGroup, Form, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import { cartAddItem, cartRemoveItem } from "../reducers/cartReducer";

function CartScreen() {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let Qty = location.search ? parseInt(location.search.split("=")[1]) : 1

  let {cartItems} = useSelector(state => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(cartRemoveItem(id));
  }

  const checkOutHandler = () => navigate("/shipping")

  let totalItemsQty = cartItems.reduce((a, b) => a + (b.Qty || 0), 0);
  let totalItemsPrice = cartItems.reduce((a, b) => a + (parseFloat(b.price) * b.Qty || 0), 0);

  return (
      <Row>
          <Col md={8}>
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                  <Message variant={"info"}>
                      Your cart is empty <Link to="/">Go Back</Link>
                  </Message>
              ) : (
                  <ListGroup as="ol" numbered variant="flush">
                      {cartItems.map((item) => (
                          <ListGroup.Item as="li" key={item._id}>
                              <Row>
                                  <Col md={2}>
                                      <Image
                                          src={item.image}
                                          alt={item.name}
                                          fluid
                                          rounded
                                      />
                                  </Col>
                                  <Col md={3}>
                                      <Link to={`/product/${item._id}`}>
                                          {item.name}
                                      </Link>
                                  </Col>
                                  <Col md={2}>${item.price}</Col>
                                  <Col md={2}>
                                      <Form.Select
                                          value={item.Qty}
                                          onChange={(e) =>
                                              dispatch(
                                                  cartAddItem({
                                                      ...item,
                                                      Qty: parseInt(
                                                          e.target.value
                                                      ),
                                                  })
                                              )
                                          }
                                      >
                                          {[
                                              ...Array(
                                                  item.countInStock
                                              ).keys(),
                                          ].map((k) => (
                                              <option key={k + 1} value={k + 1}>
                                                  {k + 1}
                                              </option>
                                          ))}
                                      </Form.Select>
                                  </Col>
                                  <Col md={1}>
                                      <Button
                                          type="button"
                                          variant="light"
                                          onClick={() =>
                                              removeFromCartHandler(item._id)
                                          }
                                      >
                                          <i className="fas fa-trash"></i>
                                      </Button>
                                  </Col>
                              </Row>
                          </ListGroup.Item>
                      ))}
                  </ListGroup>
              )}
          </Col>
          <Col md={4}>
              <Card>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h1>
                              Sub total (<small>{totalItemsQty}</small>) items:
                          </h1>
                          ${totalItemsPrice}
                      </ListGroup.Item>
                  </ListGroup>
                  <div className="d-grid p-3">
                      <Button type="button" className="dark" disabled={cartItems.length === 0} onClick={checkOutHandler}>
                          Proceed to checkout
                      </Button>
                  </div>
              </Card>
          </Col>
      </Row>
  );
}

export default CartScreen