import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "reactstrap";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { username: "", error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login() {
    let { username } = this.state;
    if (username) {
      // Store username in session storage
      sessionStorage.setItem("user", username);
      // Update state
      this.setState({ username: "" });
    } else {
      this.setState({ error: "Enter a name to enter chat room." });
    } 
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    if (sessionStorage.getItem("user")) return <Redirect to={from} />

    let { username, error } = this.state;

    return (
      <div className="login-page">
        <Form className="login-form">
          <Input
            onChange={this.handleChange}
            value={username}
            name="username"
            placeholder="Name" />
          <p className="error-message">{error}</p>
          <Button onClick={this.login} color="primary">Enter Chat Room</Button>
        </Form>
      </div>
    );
  }
}


export default LoginPage;
