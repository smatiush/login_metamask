
import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import logo from './logo.gif';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import Session from "react-session-api"
import Signature_badge from "./components/badge_view_sig.js"
import axios from "axios"


class App extends Component {
  constructor(){
    super()
    this.state = {
            signature: 'null',
            account: 'null',
            message: 'null'
        }
    }

  componentDidMount(){
    this.login()
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
    //await this.callBackendAPI()
    //return true
  }

  data_toSend = () => {
    axios.defaults.baseURL = 'http://127.0.0.1:3001';
    axios.defaults.headers.post['Content-Type'] ='application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    let response = axios.post('http://127.0.0.1:3001/login', {'signature':this.state.signature, 'account': this.state.account, 'message':this.state.message})
        .then((res)=>{return res})//promise pending
    let final_response = response.then((final_res) => {
            console.log(final_res.data.logedIn)
            return final_res.data.logedIn
          })
    console.log(final_response)
    return 'log_in'
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button type="button" className='login_btn' onClick={this.data_toSend}>login</button>
            <div className="component-div set float-left">
                <p className="badge badge-success badge-outlined">are you logged?</p>
                <Signature_badge data={this.data_toSend}/>
            </div>
            </header>
        </div>);
      };
    };

export default App;
