import React from 'react';
import { Card,Button } from 'react-bootstrap';

function Product(props) {
  let {
    product,addToCart
  } = props;

  return (
      <div>
        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }}>
        <Card.Img variant="top" src={product.images && 'http://localhost:3090'+product.images[0]}/>
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
            ${product.price}
            </Card.Text>
            <Card.Text>
            Rating: {product.rating}
            </Card.Text>
            <Button
             onClick={() =>
              addToCart({
                id: product.title,
                product,
                amount: 1
              })}
            variant="primary">Add to Cart</Button>
        </Card.Body>
        </Card>
    </div>
  );
}
export default Product;