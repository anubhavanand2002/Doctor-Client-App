import React,{useState,useEffect} from 'react'
import './BookingPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useSelector } from 'react-redux';
import {message} from 'antd';
export default function BookingPage() {
   const params=useParams();
   const[doctor,setDoctor]=useState("");

   const[date,setDate]=useState();
   const[time,setTime]=useState();

   const {user}=useSelector((state)=>(state.user));
     
   const getDoctor=()=>{
     axios.post("http://localhost:5000/api/doctor/getDoctorById",{
        doctorId:params.doctorId,
     },
     {
        headers:
        {
          "Authorization":"Bearer "+localStorage.getItem("token"),
        }
     }
     ).then((result)=>{
        if(result.data.status)
        {
            console.log(result);
            setDoctor(result.data.doctor);
        }
     }).catch((error)=>{
        console.log(error);
     })
   }


   const handleSubmit=()=>{
    axios.post("http://localhost:5000/api/auth//book-appointment",{
        userId:user?._id,
        doctorId:params.doctorId,
        userInfo:user,
        doctorInfo:doctor,
        date:date,
        time:time
    },
    {
      headers:
      {
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }
    ).then((result)=>{
      if(result.data.status)
      {
        message.success(result.data.message);
      }
      else{
        message.error(result.data.message);
      }
    }).catch((error)=>{
      console.log(error);
    })
   }


   useEffect(()=>{
     getDoctor();
   },[])

   
   useEffect(()=>{
    if(user)
     console.log(user)
   },user)


  return (
    <Layout>
     <h1>Booking Page</h1>
     <div className="booking-container">
        <div className="main-container">
            <div className="name">
                <h2>Dr. {doctor.firstName}{doctor.lastName}</h2>
            </div>
            <div className="fees">
                <h2>Fees- {doctor.feePerConsultation}</h2>
            </div>
            <div className="timings">
                <h2>Timing- {doctor.startTiming}-{doctor.endTiming}</h2>
            </div>
                <input
                type='date'
                placeholder='Select date'
                onChange={(e)=>{setDate(e.target.value)}}
                ></input>
                <div className="time">
                    <input
                    type='time'
                    placeholder='Start Time'
                    onChange={(e)=>{setTime(e.target.value)}}
                    >
                    </input>
                </div>

        </div>
        <div>
        <button className='btn'>Check Availability</button>
        </div>
        <div>
        <button 
        className='btn1'
        onClick={()=>{handleSubmit()}}
        >Book Now</button>
        </div>
     </div>
    </Layout>
  )
}
