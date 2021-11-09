
import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import Session from "react-session-api"
import Signature_badge from "./components/badge_view_sig.js"
import axios from "axios"
axios.defaults.baseURL = 'http://127.0.0.1:3001';
axios.defaults.headers.post['Content-Type'] ='application/json';

class App extends Component {
  constructor(){
    super()
    this.state = {
            signature: ''
        }
    }

  Login = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    var signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    this.setState({signature: signature})
    this.callBackendAPI()
    return true
  }

  Handle_Login_Actvt_Comp = () => {
    Session.set("signature", this.state.signature)
  };


  callBackendAPI = () => {
  var response = axios.post('http://127.0.0.1:3001/login', this.state)
    .then((res)=>{return res})
    Session.set("signature", response)
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          <button type="button" className='login_btn' onClick={this.Login}>Login</button>
          </p>
          <button type="button" className='login_btn' onClick={this.Handle_Login_Actvt_Comp}>activate react component</button>
          <div className="component-div set float-left">
            <p className="badge badge-success badge-outlined">Signature from back_end:</p>
            <Signature_badge />
          </div>
          <button type="button" className='login_btn' onClick={this.callBackendAPI}>call back-end:</button>
          <div className="component-div set float-left">
            <p className="badge badge-success badge-outlined">Signature from react session:</p>
            <Signature_badge />
          </div>
          </header>
      </div>
    );
  };
};

export default App;
