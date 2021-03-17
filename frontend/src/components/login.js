import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory} from "react-router-dom";
import axios from 'axios';

import Button from "react-bootstrap/Button";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      email: email,
      password: password
    });
    axios.post("http://localhost:3090/api/session/login",data,{headers:{"Content-Type" : "application/json"}})
    .then(resp => {
      console.log(resp);
      localStorage.setItem('accessToken',resp.data.token);
      localStorage.setItem('refreshToken',resp.data.refreshToken);
      history.push('/products');

    }).catch(err => {
      // Handle Error Here
      console.error(err);
    });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}