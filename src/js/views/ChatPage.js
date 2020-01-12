import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; 
import { Button, Form, Input } from "reactstrap";
import { wsConnect, wsSend, wsDisconnect } from "../actions/webSocket";

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.user = sessionStorage.getItem("user");
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Establish web socket connection
    this.props.connect("ws://localhost:8080")
  }

  logout() {
    // Remove user in session storage
    sessionStorage.removeItem("user");
    // Broadcast system message on disconnect
    const message = { sender: "system", text: `${this.user} left the chat` };
    this.props.send(message);
    // Disconnect from web socket
    this.props.disconnect();
    // Redirect to login page
    this.props.history.push("/login");
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.message) {
      // Send message through web socket
      const message = { sender: this.user, text: this.state.message };
      this.props.send(message);
      // Clear input text
      this.setState({ message: "" });
      // Scroll message window to bottom
      let messageWindow = document.getElementById("message-window");
      messageWindow.scrollTop = messageWindow.scrollHeight;
    }
  }

  render() {

    const { message } = this.state;
    const { messages } = this.props;
    return (
      <div className="chat">
        <div className="header">
          <h2>Chat Room</h2>
          <Button onClick={this.logout} color="primary">Leave Chat</Button>
        </div>
        <div id="message-window" className="message-window">
        {
            messages.map((message, i) => {
              if (message.sender === "system") {
                return <div className="system-message"><p>{message.text}</p></div>
              } else if (message.sender === this.user) {
                return <div className="sent-message"><p>{message.text}</p></div>
              } else {
                return (
                  <div className="received-message">
                    <div className="sender">{message.sender}</div>
                    <p>{message.text}</p>
                  </div>
                )
              }
            })
        }
        </div>
        <Form onSubmit={this.handleSubmit} autocomplete="off" className="message-input">
          <Input onChange={this.handleChange} value={message} name="message" />
          <Button type="submit" color="secondary">Send</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

const mapDispatchToProps = {
  connect: wsConnect,
  disconnect: wsDisconnect,
  send: wsSend
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));