import React, { Component, useEffect } from 'react';
import './products-list.css';
import Product from './product';
import { CardDeck } from 'react-bootstrap';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';

let products = [{
    "title": "Wooden Growth Chart",
    "price": 100,
    "shortdescription": "Handmade with love, our growth charts are made from natural wood, stained with a specially chosen eco-friendly stain and finished with a non-toxic varnish or oil.  Made from top grade pine, hand sanded and stained for a perfect finish.",
    "description": "You can choose the name, font and the starting height (numbers)! The name and numbers will be made with raised wooden lettering while the lines will be engraved into the growth chart. \n Together, this creates a beautiful 3D effect.  Lettering and numbers may look metallic but is actually just natural wood (NOT GOLD), not stained or painted. \n The edges are also rounded which looks pretty but is also safer for the little ones running around.\n ORDER EXAMPLE:  Add all letters and numbers and select growth chart width. \nJaxson Herman\n9 lbs 8 oz\n22 in\n11/20/17\nTotal Letters/Numbers = 29\nGrowth Chart Size : 7.5 Width\nStain Colour: Brown\nWhen placing the order (using the example above), select 'Brown 7.5 W' from the Colour/Size drop down list, then choose '21-30Letters/Numbers' from the Raised Letters/Numbers drop down list.\n*Note: example of standard birth information placement in photo 6.\nCOLORS - All FOUR stain colors can be seen in photos 7 - 10.\nThe standard finish is the non-toxic varnish which last longer and better protects against aging of the wood.  A request for an organic walnut oil finish (A traditional finish popular in Europe for furniture and household items) can be made in notes to seller.  Both options are the same cost.\nCOMES READY TO HANG - parents can hang our growth charts because it has a nail hole in the back ready for hanging.  They can add double sided velcro tape to secure the bottom from swinging or use double sided velcro tape to hang the whole growth chart if they don't wish to drill into the wall.\nSTANDARD MEASUREMENTS - starts from 6 inches (above most baseboards) and measures to 6 feet 6 inches.\nComes in three widths 5.5 inches, 7.5 inches and 9.5 inches.",
    "category":"Growth Chart",
    "images":[  "/resources/static/assets/uploads/MainPhoto_Gray9.5.png",
      "/resources/static/assets/uploads/BirthInfo_Raisedlettering_gray7.5.png",
      "/resources/static/assets/uploads/Brown9.5WVieraColourSample.png",
      "/resources/static/assets/uploads/DarkBrown5.5ColourSample.png",
      "/resources/static/assets/uploads/FullShotGray9.5Raisedlettering.png",
      "/resources/static/assets/uploads/Gray7.5HallieColourSample.png",
      "/resources/static/assets/uploads/NaturalwithDarkBrownPersonalization9.5Wcoloursample.png"
    ],
    "customizations": [
      {"letters":"1-10","price":"20"},
      {"letters":"11-20","price":"40"},
      {"letters":"21-30","price":"60"},
      {"letters":"31-40","price":"80"}
    ],
    "variants":[
      {"color":"Natural Wood","size":"7.5","price":"20"},
      {"color":"Brown","size":"7.5","price":"20"},
      {"color":"Dark Brown","size":"7.5","price":"20"},
      {"color":"Gray","size":"7.5","price":"20"},
      {"color":"Brown","size":"9.5","price":"40"},
      {"color":"Natural Wood","size":"9.5","price":"40"},
      {"color":"Dark Brown","size":"9.5","price":"40"},
      {"color":"Gray","size":"9.5","price":"40"},
      {"color":"Brown","size":"5.5","price":"0"},
      {"color":"Natural Wood","size":"5.5","price":"0"},
      {"color":"Dark Brown","size":"5.5","price":"0"},
      {"color":"Gray","size":"5.5","price":"0"}
    ]
  },
  {
    "title": "Hand-Crafted Wooden Name Sign",
    "price": 50,
    "shortdescription": "Give a gift that is truly personal! Our nameplates will be a keepsake item for years to come.",
    "description":" This PERSONALIZED NAMEPLATE is carved locally and hand painted with colourful designs, and would look great in your room. It can be hung on a door, put up on a shelf or on the wall./n Little ones can use the nameplate to start learning their own names. As KIDS grow older, they can appreciate having their own name in their own room!/nOur natural ECO-FRIENDLY WOOD is sourced locally and crafted by the expert hands of a LOCAL CARPENTER.We then mix NON-TOXIC ACRYLIC PAINT and HAND PAINT our nameplates with a colourful design. Each one has 2-3 coats of paint. A Rainbow pattern is used for the lettering while the background colour has many choices./nA final touch is added with 4 playful CRAFTS which kids also love alongside the vibrant colours. There are many crafts and different themes to choose from. Some popular ones include Animals, Automobiles and Girly!/nYou can PICK A THEME or select any 4 crafts./nOr name plates can be HUNG using removable dual lock strips (available at walmart). Can also be displayed nicely on a SHELF.",
    "category":"Name Plate",
    "images":[
      "/resources/static/assets/uploads/Hand-Crafted Wooden Name Sign.jpg"]
  },
  {
    "title": "Ganderandgoose Cloud Coat Rack",
    "price": 75,
    "category":"Coat Hook",
    "shortdescription": "Cloud Coat Hooks are a great way to decorate a child's room or nursery. Add a couple of raindrops to complete the look!",
    "description": "Made from natural pine wood, painted with a non-toxic acrylic paint with the hooks finished with a non-toxic varnish. This piece is made with love and care for the environment and the health of your loved ones :)/n Order the clouds alone or with raindrops which comes with one small and one large./n Comes with nail holes ready for hanging.",
    "images":[
      "/resources/static/assets/uploads/GanderandgooseCloudCoatRack.jpg"],
      "variants":[
        {"color":"Blue","size":"small","price":"0"},
        {"color":"Blue","size":"mediun","price":"40"},
        {"color":"Blue","size":"large","price":"80"}
      ]
  },
  {
    "title": "Personalised Coat Hook",
    "price": 89,
    "category":"Coat Hook",
    "shortdescription": "Colourful wooden coat racks are a great way to decorate your child's room!",
    "description": "They are also functional and can help keep your child's room a bit tidier. No more clothes piling up or bibs lying everywhere. They are also strong enough to hold bags and jackets!/nThey are carved with local wood, hand painted with 2-3 coats of NON-TOXIC ACRYLIC PAINT and a final touch is added with fun and playful crafts./n There is a wide variety of colour options to match any room colour or theme. There are also many crafts available to choose from. Children can learn their first animals like monkey or giraffe!",
    "images":[
      "/resources/static/assets/uploads/PersonalisedCoatHook.jpg"]
  },
  {
    "title": "Personalized Name Plaque",
    "price": 35,
    "category":"Name Plate",
    "shortdescription": "Our name plaques will be a keepsake item for years to come.",
    "description": "This PERSONALIZED NAME PLAQUE is carved locally and hand painted with colourful designs, and would look great in your child's room. It can be hung on a door, placed on a table, put up on a shelf or on the wall./nLittle ones can use the name plaque to start learning their own names. As KIDS grow older, they can appreciate having their own name in their own room!/nOur natural ECO-FRIENDLY WOOD is sourced locally and crafted by the expert hands of a LOCAL CARPENTER./nWe then mix NON-TOXIC ACRYLIC PAINT and HAND PAINT our name plaques with a colourful design. Each one has 2-3 coats of paint. A Rainbow pattern is used for the lettering while the background colour has many choices./nA final touch is added with 1 playful CRAFT which kids also love alongside the vibrant colours. There are many crafts and different themes to choose from. Some popular ones include Animals, Automobiles and Girly!",
    "images":[
      "/resources/static/assets/uploads/personalisednameplanque.jpg"]
  },
  {
    "title": "Personalized Name Plaque - Critters Theme",
    "price": 70,
    "category":"Name Plate",
    "shortdescription": "Our name plaques will be a keepsake item for years to come.",
    "description": "This PERSONALIZED NAME PLAQUE is carved locally and hand painted with colourful designs, and would look great in your child's room. It can be hung on a door, placed on a table, put up on a shelf or on the wall./nLittle ones can use the name plaque to start learning their own names. As KIDS grow older, they can appreciate having their own name in their own room!/nOur natural ECO-FRIENDLY WOOD is sourced locally and crafted by the expert hands of a LOCAL CARPENTER./nWe then mix NON-TOXIC ACRYLIC PAINT and HAND PAINT our name plaques with a colourful design. Each one has 2-3 coats of paint. A Rainbow pattern is used for the lettering while the background colour has many choices./nA final touch is added with 1 playful CRAFT which kids also love alongside the vibrant colours. There are many crafts and different themes to choose from. Some popular ones include Animals, Automobiles and Girly!",
    "images":[
      "/resources/static/assets/uploads/personalisednameplanquecritterstheme.jpg"]
  },
  {
    "title": "Rainbow Coat Hook with Clouds",
    "price": 89,
    "category":"Coat Hook",
    "shortdescription": "A bright and colorful rainbow with clouds that can brighten any room or nursery!",
    "description": "They are also functional and can help keep your child's room a bit tidier. No more clothes piling up or bibs lying everywhere. They are also strong enough to hold bags and jackets!/nThey are carved with local wood, hand painted with 2-3 coats of NON-TOXIC ACRYLIC PAINT and a final touch is added with fun and playful crafts./n There is a wide variety of colour options to match any room colour or theme. There are also many crafts available to choose from. Children can learn their first animals like monkey or giraffe!",
    "images":[
      "/resources/static/assets/uploads/RainbowCoatHookWithClouds.jpg"]
  },
  {
    "title": "Personalized Wooden Ornament",
    "price": 17,
    "category":"Name Plate",
    "shortdescription": "A keepsake item for years to come.",
    "description": "Made from wood and stained with an eco-friendly stain that comes in light brown brown, dark brown or natural wood. Finished with a green, red or white ribbon!/nChoose your name and we will write it in the calligraphy font shown in the photos./nMade with 1/4 inch thick wood for better quality!",
    "images":[
      "/resources/static/assets/uploads/PersonalizedWoodenOrnament.jpg"]
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
        <Carousel>
          <img style={{width:'100%', height:'400px'}} src="/images/a.jpg"/>
          <img style={{width:'100%', height:'400px'}} src="/images/b.jpg"/>
          <img style={{width:'100%', height:'400px'}} src="/images/c.jpg"/>
          <img style={{width:'100%', height:'400px'}} src="/images/d.jpg"/>
          <img style={{width:'100%', height:'400px'}} src="/images/e.jpg"/>
        </Carousel>
        <CardDeck>
            {
                products.map((product, index) => {
                    return(<Product
                        key={index}
                        product={product}
                        addToCart={props.addToCart}
                        openProductDetails={props.openProductDetails}
                        isAdmin={props.isAdmin}
                      />)
                })
            }
        </CardDeck>
      </>
    );
}