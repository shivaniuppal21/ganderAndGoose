import React from 'react';
import { Card,Button } from 'react-bootstrap';

function Product(props) {
  let {
    product
  } = props;

  return (
      <div>
        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }}>
        <Card.Img variant="top" src={product.picture}/>
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
            ${product.price}
            </Card.Text>
            <Button variant="primary">Add to Cart</Button>
        </Card.Body>
        </Card>
    </div>
  );
}
export default Product;