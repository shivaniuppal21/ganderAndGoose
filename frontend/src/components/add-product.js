import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Switch from "react-switch";
import SetVariants from './set-variants';
import SetCustomizations from './set-customizations';
import ReactSelect from 'react-select';
import DeleteIcon from '@material-ui/icons/Delete';


let initState = {
  title: "",
  price: "",
  stock: "",
  shortdescription: "",
  description: "",
  images: [],
  variants:[],
  customizations:[],
  category:""
};

export default function AddProduct(props) {
  if(props.location.product && props.location.product.title) {
    initState = props.location.product;
    console.log(props.location.product);
  }
  const [state,setState] = useState(props.location.product || initState);
  const [isSetOptions, setOptions] = useState((initState.variants && initState.variants.length > 0) || false);
  const [isSetCustomizations, setCustomizations] = useState((initState.customizations && initState.customizations.length > 0) || false);
  const categoryList = [
    { value: "Growth Chart", label: "Growth Chart" },
    { value: "Coat Hook", label: "Coat Hook" },
    { value: "Name Plate", label: "Name Plate" }
  ];
  function deleteProduct(e) {
    e.preventDefault();
    axios.delete(
      'http://localhost:3090/api/products/'+props.location.product.id,
      {
        headers:
        {
          "Content-Type" : "application/json",
          'Authorization': `Basic ${localStorage.getItem('accessToken')}` 
        }
      }
    ).then(resp => {
      console.log(resp);
      props.history.push('/products');
    }).catch(err => {
      // Handle Error Here
      console.error(err);
    });

  }
  function save(e) {
    e.preventDefault();
    const { title, price, stock, shortdescription, description,images,variants,customizations ,category} = state;
    if (title && price) {
      if(props.location.product) {
        axios.post(
          'http://localhost:3090/api/products/update/'+props.location.product.id,
          {
            title: title, 
            price:price, 
            stock:stock,
            description: shortdescription,
            productDetails:description,
            images:images,
            variants:variants,
            customizations:customizations,
            category:category
          },
          {
            headers:
            {
              "Content-Type" : "application/json",
              'Authorization': `Basic ${localStorage.getItem('accessToken')}` 
            }
          }
        ).then(resp => {
          console.log(resp);
          props.history.push('/products');
        }).catch(err => {
          // Handle Error Here
          console.error(err);
        });
      }
      else {
        axios.post(
          'http://localhost:3090/api/products/create',
          {
            title: title, 
            price:price, 
            stock:stock,
            description: shortdescription,
            productDetails:description,
            images:images,
            variants:variants,
            customizations:customizations,
            category:category
          },
          {
            headers:
            {
              "Content-Type" : "application/json",
              'Authorization': `Basic ${localStorage.getItem('accessToken')}` 
            }
          }
        ).then(resp => {
          console.log(resp);
          props.history.push('/products');
        }).catch(err => {
          // Handle Error Here
          console.error(err);
        });
      }
   

      // this.props.addProduct(
      //   {
      //     title,
      //     price,
      //     description:shortdescription,
      //     productDetails:description,
      //     stock: stock || 0
      //   },
      //   () => setState(initState)
      // );
      // setState(
      //   { flash: { status: 'is-success', msg: 'Product created successfully' }}
      // );

    } else {
      // setState(
      //   { flash: { status: 'is-danger', msg: 'Please enter title and price' }}
      // );
    }
  };

  function handleChange(e) {setState({...state, [e.target.name]: e.target.value })};
  function handleOptionsChange(val) {  
    setOptions(val);
  };
  function handleCustomizationsChange(val) {  
    setCustomizations(val);
  };
  function saveVariants(data) {
    console.log(data);
    setState({...state, variants: data });
  }
  function saveCustomizations(data) {
    console.log(data);
    setState({...state, customizations: data })
  }
  function onFileChange(event) {
    console.log(event.target.files[0]);
    let selectedFile = event.target.files[0];
    const formData = new FormData();
      // Update the formData object
      formData.append(
       "file",
        selectedFile
      );

      axios.post("http://localhost:3090/api/products/uploadimage", formData,
      {
        headers:
        {
          "Content-Type" : "application/json",
          'Authorization': `Basic ${localStorage.getItem('accessToken')}` 
        }
      }).then(resp => {
        console.log(resp);
        let img = state.images;
        img.push(resp.data[0]);
        setState({...state, images: img})
      }).catch(err => {
        // Handle Error Here
        console.error(err);
      });;
  };

  return (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={state.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={state.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Short Description: </label>
                <input
                  className="input"
                  type="text"
                  name="shortdescription"
                  value={state.shortdescription}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
              <label className="label">Category: </label>
                <ReactSelect
                  name="country"
                  options={categoryList}
                  value={categoryList.find(x => x.value === state.category)}
                  onChange={e =>
                    handleChange({
                      target: {
                        name: "category",
                        value: e.value
                      }
                    })
                  }
                />
              </div>
              <div className="field">
                <label className="label">Upload files: </label>
                <input type="file" onChange={onFileChange} />
              </div>
              <div className="field">
                <label className="label">Colors and Price Options: </label>
                <Switch onChange={handleOptionsChange} checked={isSetOptions} />
              </div>
              {isSetOptions && (
                <SetVariants
                  variants={state.variants}
                  totalVariants ={saveVariants}
                ></SetVariants>
              )}
              {/* {state.flash && (
                <div className={`notification ${state.flash.status}`}>
                  {state.flash.msg}
                </div>
              )} */}
              <div className="field">
                <label className="label">Customizations </label>
                <Switch onChange={handleCustomizationsChange} checked={isSetCustomizations} />
              </div>
              {isSetCustomizations && (
                <SetCustomizations
                customizations={state.customizations}
                totalCustomizations={saveCustomizations}
                ></SetCustomizations>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={save}
                >
                  {props.location.product ? 'Update Product' : 'Submit'}
                </button>
               {props.location.product && (
                 <button
                 className="button is-primary is-outlined is-pulled-left"
                 type="button"
                 onClick={(event) => 
                 { if (window.confirm('Are you sure you wish to delete this product?')) 
                    deleteProduct(event)
                 } } >
                    <DeleteIcon/>
                 </button>
                )} 
                </div>
            </div>
          </div>
        </form>
      </>
    );
}