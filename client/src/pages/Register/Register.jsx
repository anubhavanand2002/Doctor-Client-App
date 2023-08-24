import React,{useState} from 'react'
import './Register.css';
import axios from 'axios';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Avatar} from 'antd';
const Register = () => {
  const navigate=useNavigate();

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[image,setImage]=useState("");
  const[ImagePrev,setImagePrev]=useState("");

  const changeImageHandler=(e)=>{
    const file=e.target.files[0];//meata data
    if(file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        console.log(reader.result);
        setImagePrev(reader.result);
        setImage(file);
      }
    }

  }


  const handleSubmit=()=>{
    console.log(name);
    const formData=new FormData();
    formData.append("name",name,);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("image",image);
      axios.post(`https://doctorapp-api.vercel.app/api/auth/register`,
       formData
      ).then((result)=>{
         if(result.data.status)
         {
            message.success(result.data.message);
            navigate("/login");
         }
         else{
          message.error(result.data.message);
         }
      }).catch((error)=>{
        console.log(error)
      })
  }
  return (
    <div>
      <div className="register-container">
       <div className="main-container">
       <h1>Register</h1>
       <Avatar size={60} icon={<ion-icon name="person-outline"></ion-icon>}
       src={ImagePrev}
       />
       <div className="name">
            <p>Name</p>
            <input 
            type="name" 
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            ></input>
          </div>
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
          <div className="avatar">
            <p>Avatar</p>
            <input 
            type='file'
            accept="image/*"
            placeholder='Choose Your Avatar' 
            onChange={changeImageHandler}
            />
          </div>
          <button type="submit" onClick={()=>{handleSubmit()}}>Submit</button>
          <Link to="/login">Have You Already Registered?Then Login</Link>
       </div>
   </div>
    </div>
  )
}

export default Register
