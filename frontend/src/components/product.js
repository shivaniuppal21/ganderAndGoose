import React from 'react';
import { Card,Button } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

function Product(props) {
  let history = useHistory();
  let {
    product,addToCart
  } = props;
  return (
      <div onClick={()=>{history.push({pathname:'/product-details',product:product})}}>
        <Card style={{ minWidth: '18rem', maxWidth: '18rem' ,marginTop:'50px'}}>
        <Card.Img variant="top" style={{alignItems:'center' ,width:'100px' , height:'100px'}} src={product.images && 'http://localhost:3090'+product.images[0]}/>
        <Card.Body style={{ minHeight:'210px'}}>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
            ${product.price}
            </Card.Text>
            <Card.Text>
            Rating: {product.rating || 'No reviews'}
            </Card.Text>
            <Card.Text>
            Category: {product.category || 'Non-categorized'}
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