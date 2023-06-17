import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';


export default function ProtectedRoute({children}) {

  const dispatch=useDispatch();
const {user}=useSelector((state)=>(state.user));
 
const getUser=()=>{
   axios.post("http://localhost:5000/api/auth/getUserData",{},{
    headers:{
      Authorization:"Bearer " + localStorage.getItem("token"),
    }
   }).then((result)=>{
    if(result.data.status)
    {
      console.log(result);
      dispatch(setUser(result.data.data.user));
    }
    else{
      <Navigate to="/login"/>
      localStorage.clear();
    }
   }).catch((error)=>{
    localStorage.clear();
    console.log(error);
   })
}


useEffect(()=>{
  if(!user)
    getUser();
},[user])

  
      if(localStorage.getItem("token"))
      {
        return children;
      }
      else{
        return <Navigate to="/login"/>
      }
}
