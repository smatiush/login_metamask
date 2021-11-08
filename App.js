
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

  handleSignMessage = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    var signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    this.setState({signature: signature})
    return await this.callBackendAPI(this.state)
  };

  /*callBackendAPI = async (sig) => {
    const response = await fetch('/admin')
    const body = await response;
    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log(body)
    return body;
  };*/


  callBackendAPI = async (sig) => {
      axios.post('http://127.0.0.1:3001/login', this.state)
      .then((res)=>{console.log(res)})
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Gambaru  login with metamask</h1>
          <button type="button" className='login_btn' onClick={this.handleSignMessage}>login</button>
          <div className="component-div set float-left">
            <p>Signature badge</p>
            <Signature_badge />
          </div>
          </header>
      </div>
    );
  };
};

export default App;
