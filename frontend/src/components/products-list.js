import React, { Component } from 'react';
import './products-list.css';
import Product from './product';
import { CardDeck } from 'react-bootstrap';
let products = [
    {
        name: 'Toy 1',
        price: 10,
        description: 'test data',
        picture:'https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk',
        rating:5
    },
    {
        name: 'Test 2',
        price: 200,
        description: 'test data 2',
        picture:'https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk',
        rating:4.5
    },
    {
        name: 'test 3',
        price: 100,
        description: 'kjdskfjskfjsdkf',
        picture:'https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk',
        rating:3
    },
    {
        name: 'test 4',
        price: 100,
        description: 'kjdskfjskfjsdkf',
        picture:'https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk',
        rating:4
    },
    {
        name: 'test 5',
        price: 100,
        description: 'kjdskfjskfjsdkf',
        picture:'https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk',
        rating:5
    }
];
export default class ProductsList extends Component {
    render() {
        return (
            <>
                <h2>Products</h2>
                <br/>
                <CardDeck>
                    {
                        products.map((product, index) => {
                            return(<Product
                                key={index}
                                product={product} />)
                        })
                    }
                </CardDeck>
            </>
        );
    }
}