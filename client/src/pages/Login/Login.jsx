import React,{useState} from "react";
import './Login.css';
import axios from 'axios';
import {message} from 'antd';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const handleSubmit=()=>{
    axios.post("https://doctorapp-api.vercel.app/api/auth/login",{
      email,
      password
    }).then((result)=>{
      if(result.data.status)
      {
        localStorage.setItem('token',result.data.token);
        console.log(result.data.token);
         message.success(result.data.message);
         navigate("/");
      }
      else{
        message.error(result.data.message);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
   <div className="login-container">
       <div className="main-container">
       <h1>Login</h1>
          <div className="email">
            <p>Email</p>
            <input 
            type="email" 
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
          </div>
          <div className="password" placeholder="Enter Your Password">
            <p>Password</p>
            <input 
            type="password" 
            placeholder="Enter Your Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
          </div>
          <button type="submit" onClick={()=>{handleSubmit()}}>Submit</button>
          <Link to="/register">Are You a new User?Register First</Link>
       </div>
   </div>
  );
};

export default Login;
