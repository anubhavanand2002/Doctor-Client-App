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
  const[IsAvailable,setIsAvailable]=useState(false);
   const[date,setDate]=useState();
   const[time,setTime]=useState();

   const {user}=useSelector((state)=>(state.user));
     

    const makePayment = async (amount, user) => {
  try {
    //api key 
    const response1 = await axios.get(
      `https://doctorapp-api.vercel.app/api/payment/get-key`
    );
    //for creating a window for some time
    const response2 = await axios.post(
      `https://doctorapp-api.vercel.app/api/payment/checkout`,
      {
        amount,
      }
    );
   

    const { key } = response1.data;
    const { order } = response2.data;

    const option = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Doctor Appointment",
      description: "Payment for Doctor Appointment",
      order_id: order.id,
      prefill: {
        name: "Doctor App",
        email: "doctor@gmail.com",
        contact: "9865541789",
      },
      notes: {
        address: "Botanical Garden Area, Howrah, West Bengal 711103",
      },
      theme: { color: "#e70b53" },
  
      handler: async (response) => {
        try {
          const res = await axios.post(
            `https://doctorapp-api.vercel.app/api/payment/payment-verification`,
            {
              ...response,
              amount,
              user
            }
          );

          const {status} = res.data;
          if(status){
            handleSubmit();
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
    const razor = window.Razorpay(option);
    razor.open();
  } catch (error) {
    console.log(error);
  }
};














   const getDoctor=()=>{
     axios.post("https://doctorapp-api.vercel.app/api/doctor/getDoctorById",{
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
    axios.post("https://doctorapp-api.vercel.app/api/auth/book-appointment",{
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

   const handleCheckingAvailability=()=>{
    axios.post("https://doctorapp-api.vercel.app/api/auth/checking-availability",{
      doctorId:params.doctorId,
      date,
      time,
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
        message.success(result.data.message);
        setIsAvailable(true);
      }
      else{
        message.error(result.data.message);
        setIsAvailable(false);
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
        <button 
        className='btn'
        onClick={()=>{handleCheckingAvailability()}}
        >
          Check Availability
        </button>
        </div>
       {
        IsAvailable &&
        <div>
        <button 
        className='btn1'
        onClick={()=>{makePayment(doctor.feePerConsultation,user)}}
        >Book Now</button>
        </div>
       }
     </div>
    </Layout>
  )
}
