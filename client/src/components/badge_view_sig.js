import React, { Component } from "react";
import Session from "react-session-api";
import './badge_view_sig.css';

class Signature_badge extends Component {
  constructor() {
    super();
    this.state = {signature: 0}
  }

  componentDidMount() {
    const getSig = (data) => {
      this.setState({ signature: data["signature"] });
    };
    Session.onSet(getSig)
  }

  render() {
    return (
      <h5>
        signature :{this.state.signature}
        <span className="badge">
          {this.state.signature}
        </span>
      </h5>
    );
  }
}

export default Signature_badge;
