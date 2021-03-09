import React, { Component } from 'react';
import ReactSelect from 'react-select';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        country: null,
        zipCode: ""
      },
      formErrors: {
        firstName: null,
        lastName: null,
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null,
        country: null
      }
    };
    this.countryList = [
      { value: "india", label: "India" },
      { value: "us", label: "US" },
      { value: "canada", label: "Canada" },
      { value: "australia", label: "Australia" }
    ];
  }

  validateNumber = evt => {
    var theEvent = evt || window.event;
    var key = null;
    // Handle paste
    if (theEvent.type === "paste") {
      key = theEvent.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
      formObj = {
        ...form,
        [name]: value
      };
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObj = {};
      if (name === "password" || name === "confirmPassword") {
        let refValue = this.state.form[
          name === "password" ? "confirmPassword" : "password"
        ];
        const errorMsg = this.validateField(name, value, refValue);
        formErrorsObj = { ...formErrors, [name]: errorMsg };
        if (!errorMsg && refValue) {
          formErrorsObj.confirmPassword = null;
          formErrorsObj.password = null;
        }
      } else {
        const errorMsg = this.validateField(
          name,
          value
        );
        formErrorsObj = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorsObj });
    });
  }

  validateField = (name, value, refValue) => {
    let errorMsg = null;
    switch (name) {
      case "firstName":
        if (!value) errorMsg = "Please enter First Name.";
        break;
      case "lastName":
        if (!value) errorMsg = "Please enter Last Name.";
        break;
      case "email":
        if (!value) errorMsg = "Please enter Email.";
        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
          errorMsg = "Please enter valid Email.";
        break;
      case "mobile":
        if (!value) errorMsg = "Please enter Mobile.";
        break;
      case "country":
        if (!value) errorMsg = "Please select Country.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMsg = "Please enter Password.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
      case "confirmPassword":
        // refValue is the value of Password field
        if (!value) errorMsg = "Please enter Confirm Password.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  validateForm = (form, formErrors, validateFunc) => {
    const errorObj = {};
    Object.keys(formErrors).map(x => {
      let refValue = null;
      if (x === "password" || x === "confirmPassword") {
        refValue = form[x === "password" ? "confirmPassword" : "password"];
      }
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
      return errorObj;
    });
    return errorObj;
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    console.log('Data: ', form);
  };

  render() {
    const { form, formErrors } = this.state;
    return (
      <div className="signup-box">
        <p className="title">Sign up</p>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                First Name:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.firstName && <span className="err">{formErrors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>
                Last Name:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.lastName && <span className="err">{formErrors.lastName}</span>}
            </div>
            
           <div className="form-group">
              <label>
                Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.password && <span className="err">{formErrors.password}</span>}
            </div>
            <div className="form-group">
              <label>
                Confirm Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.confirmPassword && <span className="err">{formErrors.confirmPassword}</span>}
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
              <label>
                Email:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={form.email}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.email && <span className="err">{formErrors.email}</span>}
            </div>
            
            <div className="form-group">
              
              <label>
                Mobile:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={this.handleChange}
                onBlur={this.handleChange}
                onKeyPress={this.validateNumber}
              />
              {formErrors.mobile && <span className="err">{formErrors.mobile}</span>}
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                className="form-control"
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                Country:<span className="asterisk">*</span>
              </label>
              <ReactSelect
                name="country"
                options={this.countryList}
                value={this.countryList.find(x => x.value === form.country)}
                onChange={e =>
                  this.handleChange({
                    target: {
                      name: "country",
                      value: e.value
                    }
                  })
                }
              />
              {formErrors.country && <span className="err">{formErrors.country}</span>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default SignUp;