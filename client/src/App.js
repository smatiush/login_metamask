
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
    axios.defaults.baseURL = 'http://127.0.0.1:3001';
    axios.defaults.headers.post['Content-Type'] ='application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    super()
    this.state = {
            signature: 'null'
        }
    }

  login = async () => {
    const ethereum = await detectEthereumProvider()
    const message = "welcome to Gambaru";
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    const account = accounts[0];
    let signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ]});
    this.state.signature = signature
    console.log('session data:' + this.state.signature)
    //await this.callBackendAPI()
    //return true
  }


  callBackendAPI = () => {
    this.login().then(()=>{let response = axios.post('http://127.0.0.1:3001/login', {'signature':this.state.signature})
      .then((res)=>{return res})//promise pending
      response.then((final_res) => {
        if(final_res.data.logedIn == false){
          console.log(final_res.data.logedIn)
          return final_res.data.signature
        }else{
          console.log(final_res.data.signature)
          return final_res.data.signature
        }
      })
    });
  }


  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button type="button" className='login_btn' onClick={this.callBackendAPI}>call back-end</button>
            <div className="component-div set float-left">
                <p className="badge badge-success badge-outlined">Signature from back_end:</p>
                <Signature_badge signature={this.callBackendAPI}/>
            </div>
            </header>
        </div>);
      };
    };

export default App;
