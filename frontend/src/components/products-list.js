import React, { Component, useEffect } from 'react';
import './products-list.css';
import Product from './product';
import { CardDeck } from 'react-bootstrap';
import axios from 'axios';

let products = [
    {
        title: 'Toy 1',
        price: 10,
        images:['https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk'],
        rating:5
    },
    {
        title: 'Test 2',
        price: 200,
        images:['https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk'],
        rating:4.5
    },
    {
        title: 'test 3',
        price: 100,
        images:['https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk'],
        rating:3
    },
    {
        title: 'test 4',
        price: 100,
        images:['https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk'],
        rating:3
    },
    {
        title: 'test 5',
        price: 100,
        images:['https://i.picsum.photos/id/773/200/200.jpg?hmac=0hv9IpliWL2N0sAasWERqujU16tTk6K20nep2Q2P1Bk'],
        rating:3
    }
];
export default function ProductsList(props) {
        useEffect(()=>{
        //props.setProducts(products);
        axios.get("http://localhost:3090/api/products",null,{headers:{"Content-Type" : "application/json"}})
        .then(resp => {
            products = resp.data;
            props.setProducts(products);
        }).catch(err => {
            // Handle Error Here
            console.error(err);
        });
    },[])
    return (
        <>
            <h2>Products</h2>
            <br/>
            <CardDeck>
                {
                    products.map((product, index) => {
                        return(<Product
                            key={index}
                            product={product}
                            addToCart={props.addToCart}
                            openProductDetails={props.openProductDetails}
                         />)
                    })
                }
            </CardDeck>
        </>
    );
}