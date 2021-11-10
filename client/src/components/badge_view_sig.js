import React, { Component } from "react";
import Session from "react-session-api";
import ReactDOM from "react-dom";
import './badge_view_sig.css';

const Signature_badge = (props) => {
  return (
      <span className="badge">
        <h5> {props.signature} </h5>
      </span>
    );
  }

export default Signature_badge;
