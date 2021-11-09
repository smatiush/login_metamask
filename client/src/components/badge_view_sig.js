import React, { Component } from "react";
import Session from "react-session-api";
import './badge_view_sig.css';

class Signature_badge extends Component {
  constructor() {
    super();
    this.state = {signature: ''}
  }

  componentDidMount() {
    const getSig = (data) => {
      this.setState({ signature: data["signature"] });
    };
    Session.onSet(getSig)
  }

  render() {
    return (
        <span className="badge">
          {this.state.signature}
        </span>
    );
  }
}

export default Signature_badge;
