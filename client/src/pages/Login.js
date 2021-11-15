import React from "react";
import { useParams } from "react-router-dom";
import {Outlet, Link } from "react-router-dom";
import logo from '../logo.gif';
import '../App.css';
import axios from "axios"


//nomi delle funzioni e variabili tutto camelcase


const Login = () => {
  const logged = useParams()
  console.log(logged.login)
  return <h1>are you logged? { logged.login}</h1>
}
export default Login;
