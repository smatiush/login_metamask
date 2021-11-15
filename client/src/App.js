
import React, { Component } from 'react';
import {Outlet, Link } from "react-router-dom";
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import Session from "react-session-api"
import axios from "axios"
import Login from "./pages/Login"


class App extends Component {
  constructor(){
    super()
    this.state = {
            signature: 'null',
            account: 'null',
            message: 'null',
            auth: false
        }
    }

  login = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    let signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    this.state.signature = signature
    this.state.account = account
    this.state.message = message
    console.log('session data:' + this.state.signature)
  }

  data_toSend = async () => {
    await this.login()
    axios.defaults.baseURL = 'http://127.0.0.1:3001';
    axios.defaults.headers.post['Content-Type'] ='application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    let response = axios.post('http://127.0.0.1:3001/login', {'signature':this.state.signature, 'account': this.state.account, 'message':this.state.message})
        .then((res)=>{return res})//promise pending
    let final_response = response.then((final_res) => {
            return final_res.data.logedIn
          })
    console.log(final_response)
    this.handleButtonDashboard()
  }

handleButtonDashboard = async () => {
  let credentials  = await axios.get('http://127.0.0.1:3001/credential')
  if(credentials.data.auth.logedin == true){
    this.setState({'auth':true})
  } else {
    this.setState({'auth':false})
  }
}

shouldComponentUpdate(nextState) {
return this.state.auth != nextState.auth;
}

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            <Link to={`/login/${this.state.auth}`} className='login_btn'>open dashboard</Link>
            <Outlet />
            </p>
            <button type="button" className='login_btn' onClick={this.data_toSend}>login</button>
            </header>
        </div>);
      };
    };

export default App;
