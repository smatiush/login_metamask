import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import  { Redirect } from 'react-router-dom'

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
    var signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    await this.callBackendAPI(signature)
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
    const response = await fetch('/admin', {
      method:'post',
      body:JSON.stringify({
        signature : sig})
    })
  }


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
  };
};

export default App;
