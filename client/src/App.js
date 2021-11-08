import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class App extends Component {
state = {
    data: null
  };

  handleSignMessage = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    var signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    await this.callBackendAPI(signature)
  };



  callBackendAPI = async (sig) => {
    axios.post('http://127.0.0.1:5000/admin',{
      headers: {'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/admin'},
      params:sig
    })
    .then(() => console.log('signature sended'))
    .catch(err => {
        console.error(err);
      });
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
