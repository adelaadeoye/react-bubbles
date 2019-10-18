import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axiosWithAuth from '../utils/axiosWithAuth'
const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initial = {
    username: "",
    password: ""
  };
  const [credentials, setCredentials] = useState(initial);
  const changeHandler = e => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(credentials);
    axiosWithAuth()
    .post("/api/login", credentials)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      console.log(props.history);
      console.log(res);
      props.history.push('/bubbles')
    }).catch(err => console.log(err.response));
    // // app.post("/api/login", (req, res) => {
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="usernameLabel">Username</Label>
          <Input
            type="text"
            name="username"
            id="usernameLabel"
            onChange={changeHandler}
            value={credentials.name}
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordLabel">Password</Label>
          <Input
            type="password"
            name="password"
            id="passwordLabel"
            onChange={changeHandler}
            value={credentials.password}
            placeholder="password "
          />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>{" "}
    </>
  );
};

export default Login;
