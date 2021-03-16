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
  description: ""
};

export default function AddProduct(props) {
  const state = initState;
  const user = {accessLevel : 0};
  const [isSetOptions, setOptions] = useState(false);
  const [isSetCustomizations, setCustomizations] = useState(false);
  function save(e) {
    e.preventDefault();
    const { name, price, stock, shortDesc, description } = state;
    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      axios.post(
        'http://localhost:3001/products',
        { id, name, price, stock, shortDesc, description },
      )

      this.props.addProduct(
        {
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product created successfully' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
      );
    }
  };

  function handleChange(e) {this.setState({ [e.target.name]: e.target.value, error: "" })};
  function handleOptionsChange(val) {  
    setOptions(val);
  };
  function handleCustomizationsChange(val) {  
    setCustomizations(val);
  };

  return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
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
                <label className="label">Colors and Price Options: </label>
                <Switch onChange={handleOptionsChange} checked={isSetOptions} />
              </div>
              {isSetOptions && (
                <SetVariants
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