import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
var web3 = require('web3');

class App extends Component {
state = {
    data: null
  };
  /*async componentDidMount(){
    await this.handleSignMessage()
  }*/

  handleSignMessage = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    const signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    await this.callBackendAPI()
  };

  callBackendAPI = async () => {
    const response = await fetch('/authenticated');
    const body = await response;
    console.log(body)
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Gambaru  login with metamask</h1>
          <button type="button" className='login_btn' onClick={this.handleSignMessage}>login</button>
          </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
