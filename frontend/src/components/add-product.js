import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Switch from "react-switch";
import SetVariants from './set-variants';
import SetCustomizations from './set-customizations';

const initState = {
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
  images: [],
  variants:[],
  customizations:[]
};

export default function AddProduct(props) {
  const [state,setState] = useState(initState);
  const [isSetOptions, setOptions] = useState(false);
  const [isSetCustomizations, setCustomizations] = useState(false);
  function save(e) {
    e.preventDefault();
    const { name, price, stock, shortDesc, description,images,variants,customizations } = state;
    if (name && price) {
      axios.post(
        'http://localhost:3090/api/products/create',
        {
          title: name, 
          price:price, 
          stock:stock,
          description: shortDesc,
          productDetails:description,
          images:images,
          variants:variants,
          customizations:customizations
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

      // this.props.addProduct(
      //   {
      //     name,
      //     price,
      //     description:shortDesc,
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
      //   { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
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
                  name="name"
                  value={state.name}
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
                  name="shortDesc"
                  value={state.shortDesc}
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
                <label className="label">Upload files: </label>
                <input type="file" onChange={onFileChange} />
              </div>
              <div className="field">
                <label className="label">Colors and Price Options: </label>
                <Switch onChange={handleOptionsChange} checked={isSetOptions} />
              </div>
              {isSetOptions && (
                <SetVariants
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
                totalCustomizations={saveCustomizations}
                ></SetCustomizations>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
}