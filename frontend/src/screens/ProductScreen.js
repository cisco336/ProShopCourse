import React, { useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductByIdQuery } from '../reducers/productReducer'
import { cartAddItem } from '../reducers/cartReducer'

function ProductScreen() {
  const params = useParams();
  const [Qty, setQty] = useState(1);
  const {
      data: product,
      isFetching,
      isSuccess,
      error
  } = useGetProductByIdQuery(params.id);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (product) => {
    dispatch(cartAddItem({...product, Qty}))
    navigate(`/cart/`);
  }

  return (
      <div>
          <Link to={"/"} className="btn btn-light my-3">
              Go Back
          </Link>
          {isFetching ? (
              <Loader />
          ) : !isSuccess ? (
              <Message variant={"danger"}>{error}</Message>
          ) : (
              <Row>
                  <Col md={6}>
                      <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col md={3}>
                      <ListGroup variant="flush">
                          <ListGroup.Item>
                              <h3>{product.name}</h3>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                                  color={"#f8e825"}
                              />
                          </ListGroup.Item>
                          <ListGroup.Item>
                              Price: ${product.price}
                          </ListGroup.Item>
                          <ListGroup.Item>
                              Description: {product.description}
                          </ListGroup.Item>
                      </ListGroup>
                  </Col>
                  <Col md={3}>
                      <Card>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Price:</Col>
                                      <Col>{product.price}</Col>
                                  </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Status:</Col>
                                      <Col>
                                          {product.countInStock > 0
                                              ? "In Stock"
                                              : "Out of Stock"}
                                      </Col>
                                  </Row>
                              </ListGroup.Item>
                              {product.countInStock > 0 && (
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Qty:</Col>
                                          <Col xs="auto">
                                            <Form.Select value={Qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(k => <option key={k + 1} value={k + 1}>{k + 1}</option>)
                                                }
                                            </Form.Select>
                                        </Col>
                                      </Row>
                                  </ListGroup.Item>
                              )}
                            <div className="d-grid p-3">
                                <Button
                                    className="btn"
                                    type="button"
                                    disabled={product.countInStock == 0}
                                    onClick={() => addToCartHandler(product)}
                                >
                                    Add To Cart
                                </Button>
                            </div>
                          </ListGroup>
                      </Card>
                  </Col>
              </Row>
          )}
      </div>
  );
}

export default ProductScreen