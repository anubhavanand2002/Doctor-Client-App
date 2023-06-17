import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Profile() {

    const {user}=useSelector((state)=>(state.user));
    const[doctorInfo,setDoctorInfo]=useState("");

    const getDoctorInfo=()=>{
      axios.post("http://localhost:5000/api/doctor/getdoctorInfo",{
        userId:user?._id
      },
      {
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token"),
        }
      }
      ).then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      })
    }
 
useEffect(()=>{
   getDoctorInfo();
},[])
  return (
    <Layout>
        Profile
    </Layout>
  )
}
