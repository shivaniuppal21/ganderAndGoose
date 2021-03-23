import React,{useEffect} from "react";
import './product-details.css';
import ReactSelect from 'react-select';
import { Link } from "react-router-dom";
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import ImageGallery from 'react-image-gallery';

import {
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
export default function ProductDetails(props) {
  let params = {};
  let product = {};
  let images = [];
  // let items = [
  //   'https://picsum.photos/id/1/200/300',
  //   'https://picsum.photos/id/2/200/300',
  //   'https://picsum.photos/id/3/200/300',
  //   'https://picsum.photos/id/4/200/300',
  //   'https://picsum.photos/id/5/200/300',
  // ]
  // const images = [
  //   {
  //     original: 'https://picsum.photos/id/1018/2000/2500/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/150/100/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/300/400/',
  //     thumbnail: 'https://picsum.photos/id/1019/220/350/',
  //   },
  // ];
  // useEffect(()=>{
    if(props.location && props.location.search && product.location.search.length > 0) {
      params = props.location.search.substr(1)
        .split('&')
        .reduce((carry, pair) => {
          const [ key, val ] = pair.split('=');
          carry[unescape(key)] = unescape(val);
          return carry;
      }, {});
      axios.get("http://localhost:3090/api/products?id="+params.id,null,{headers:{"Content-Type" : "application/json"}})
      .then(resp => {
          product = resp.data;
          for(let i = 0 ; i < product.images.length;i++) {
            images.push({
              original:'http://localhost:3090'+product.images[i],
              thumbnail:'http://localhost:3090'+product.images[i]
            })
          }
      }).catch(err => {
          // Handle Error Here
          console.error(err);
      });
    }
    else {
       product = props.location.product;
       for(let i = 0 ; i < product.images.length;i++) {
        images.push({
          original:'http://localhost:3090'+product.images[i],
          thumbnail:'http://localhost:3090'+product.images[i]
        })
      }
    }
//},[]);
  
  
  //  let img = items;
  // product = {
  //   "title": "Wooden Growth Chart",
  //   "price": 100,
  //   "shortdescription": "Handmade with love, our growth charts are made from natural wood, stained with a specially chosen eco-friendly stain and finished with a non-toxic varnish or oil.  Made from top grade pine, hand sanded and stained for a perfect finish.",
  //   "description": "You can choose the name, font and the starting height (numbers)! The name and numbers will be made with raised wooden lettering while the lines will be engraved into the growth chart. \n Together, this creates a beautiful 3D effect.  Lettering and numbers may look metallic but is actually just natural wood (NOT GOLD), not stained or painted. \n The edges are also rounded which looks pretty but is also safer for the little ones running around.\n ORDER EXAMPLE:  Add all letters and numbers and select growth chart width. \nJaxson Herman\n9 lbs 8 oz\n22 in\n11/20/17\nTotal Letters/Numbers = 29\nGrowth Chart Size : 7.5 Width\nStain Colour: Brown\nWhen placing the order (using the example above), select 'Brown 7.5 W' from the Colour/Size drop down list, then choose '21-30Letters/Numbers' from the Raised Letters/Numbers drop down list.\n*Note: example of standard birth information placement in photo 6.\nCOLORS - All FOUR stain colors can be seen in photos 7 - 10.\nThe standard finish is the non-toxic varnish which last longer and better protects against aging of the wood.  A request for an organic walnut oil finish (A traditional finish popular in Europe for furniture and household items) can be made in notes to seller.  Both options are the same cost.\nCOMES READY TO HANG - parents can hang our growth charts because it has a nail hole in the back ready for hanging.  They can add double sided velcro tape to secure the bottom from swinging or use double sided velcro tape to hang the whole growth chart if they don't wish to drill into the wall.\nSTANDARD MEASUREMENTS - starts from 6 inches (above most baseboards) and measures to 6 feet 6 inches.\nComes in three widths 5.5 inches, 7.5 inches and 9.5 inches.",
  //   "category":"Growth Chart",
  //   "images":img,
  //   "customizations": [
  //     {"letters":"1-10","price":"20"},
  //     {"letters":"11-20","price":"40"},
  //     {"letters":"21-30","price":"60"},
  //     {"letters":"31-40","price":"80"}
  //   ],
  //   "variants":[
  //     {"color":"Natural Wood","size":"7.5","price":"20"},
  //     {"color":"Brown","size":"7.5","price":"20"},
  //     {"color":"Dark Brown","size":"7.5","price":"20"},
  //     {"color":"Gray","size":"7.5","price":"20"},
  //     {"color":"Brown","size":"9.5","price":"40"},
  //     {"color":"Natural Wood","size":"9.5","price":"40"},
  //     {"color":"Dark Brown","size":"9.5","price":"40"},
  //     {"color":"Gray","size":"9.5","price":"40"},
  //     {"color":"Brown","size":"5.5","price":"0"},
  //     {"color":"Natural Wood","size":"5.5","price":"0"},
  //     {"color":"Dark Brown","size":"5.5","price":"0"},
  //     {"color":"Gray","size":"5.5","price":"0"}
  //   ]
  // }
  return (
    <div>
    <div className="details">
      <div className="big-img">
      <ImageGallery items={images} />;
      </div>
      
      <div className="box">
        <div className="row">
          <h2>{product.title}</h2>
          <span>${product.price}</span>
        </div>
        <div className="row" style={{ justifyContent:'left'}}>
          <FacebookShareButton
           url={String(window.location)}>
             <FacebookIcon size={32} round={true}></FacebookIcon>
          </FacebookShareButton> 
          <EmailShareButton 
              subject="Check out this amazing product only on Gander and Goose"
              body={`Visit http://ganderAndgoose.com?id=${product.id} now to find amazing products.The one I shortlisted especially for you.`}
              url="http://ganderAndGoose.com"> 
              <EmailIcon size={32} round={true}></EmailIcon> 
          </EmailShareButton>  
          <PinterestShareButton 
            media={`http://localhost:3090${product.images[0]}`}
            url={String(window.location)}>
            <PinterestIcon size={32} round={true}></PinterestIcon> 
          </PinterestShareButton>  
          <TwitterShareButton
           url={String(window.location)}
           title={product.title}>
             <TwitterIcon size={32} round={true}></TwitterIcon>
          </TwitterShareButton>
        </div>
        <div className="row">
          <Link to={{ 
              pathname: "/contactUs",
              myCustomProps: product
          }}>
            Ask us about this product
          </Link>
        </div>
        {product.variants && product.variants.length > 0 && (
          <div className="row">
           <h3>Select Variant</h3>
           <select>
           {product.variants.map((x,y) => <option key={y}>{x.color+'('+ x.size +')'}</option>)}
           </select>
           </div>
        )}
        {product.customizations && product.customizations.length > 0 && (
          <div className="row">
           <h3>Select Customization</h3>
           <select>
           {product.customizations.map((x,y) => <option key={y}>{x.letters}</option>)}
           </select>
           </div>
        )}
        <div className="row">
          <h3>Overview</h3>
          <p>{product.shortdescription}</p>
          </div>
          <div className="row">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <button
          className="button is-small is-outlined is-primary is-pulled-right"
          onClick={() =>
            props.addToCart({
              id: product.title,
              product,
              amount: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
};