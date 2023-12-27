import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../reducers/productReducer'
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function HomeScreen() {
    const { data: products, isFetching, isSuccess, error } = useGetProductsQuery();
  return (
      <div>
          <h1>Latest Products</h1>
          {isFetching ? (
              <Loader />
          ) : !isSuccess ? (
              <Message variant={"danger"}>
                  Error: {error.error}, Status: {error.originalStatus}
              </Message>
          ) : (
              <Row>
                  {products.map((product, index) => {
                      return (
                          <Col key={index} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                          </Col>
                      );
                  })}
              </Row>
          )}
      </div>
  );
}
