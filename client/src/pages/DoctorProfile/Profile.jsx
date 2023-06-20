import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Profile.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Profile() {

  const navigate=useNavigate();
    const {user}=useSelector((state)=>(state.user));
    const [doctorInfo, setDoctorInfo] = useState(null);

const [firstname, setFirstName] = useState("");
const [lastname, setLastName] = useState("");
const [number, setNumber] = useState("");
const [email, setEmail] = useState("");
const [website, setWebsite] = useState("");
const [address, setAddress] = useState("");
const [specialization, setSpecialization] = useState("");
const [experience, setExperience] = useState("");
const [fee, setFee] = useState("");
const [startTiming, setStartTiming] = useState("");
const [endTiming, setEndTiming] = useState("");

const handledoctorSubmit = () => {
  // Handle form submission
  axios.post("https://doctorapp-api.vercel.app/api/doctor/updateDoctorInfo",{
    userId:user?._id,
    firstName:firstname,
    lastName:lastname,
    phone:number,
    email,
    website,
    address,
    specialization,
    experience,
    feePerConsultation:fee,
    startTiming,
    endTiming
  },
  {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  } 
  ).then((result)=>{
    if(result.data.status)
    {
      message.success(result.data.message);
      navigate("/");
    }
    else
    {
      message.error(result.data.error);
    }
  }).catch((error)=>{
    console.log(error);
  })
  
};

const getDoctorInfo = () => {
  axios
    .post("https://doctorapp-api.vercel.app/api/doctor/getdoctorInfo", {
      userId: user?._id
    }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    .then((result) => {
      console.log(result);
      setDoctorInfo(result.data.doctor);
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  getDoctorInfo();
}, []);

useEffect(() => {
  if (doctorInfo) {
    setFirstName(doctorInfo.firstName);
    setLastName(doctorInfo.lastName);
    setNumber(doctorInfo.phone);
    setEmail(doctorInfo.email);
    setWebsite(doctorInfo.website);
    setAddress(doctorInfo.address);
    setSpecialization(doctorInfo.specialization);
    setExperience(doctorInfo.experience);
    setFee(doctorInfo.feePerConsultation);
    setStartTiming(doctorInfo.startTiming);
    setEndTiming(doctorInfo.endTiming);
  }
}, [doctorInfo]);

// Rest of your code

  return (
    <Layout>
        <div className="profile-container">
            <div className="main-container">
            <h2>Personal Details:</h2>
                <div className="personal-details">
                <div className="info">
                <p>
                    First Name 
                </p>
                <input
                    type='text'
                    placeholder='Enter Your firstname'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                </div>

                     <div className="info">
                         <p>Last Name </p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Lastname'
                         value={lastname}
                         onChange={(e)=>{setLastName(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Phone </p>
                         <input 
                         type='text' 
                         placeholder='Enter Your PhoneNumber'
                         value={number}
                         onChange={(e)=>{setNumber(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Email </p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Email'
                         value={email}
                         onChange={(e)=>{setEmail(e.target.value)}}
                         ></input>
                     </div>
  
                     <div className="info">
                         <p>Website</p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Website'
                         value={website}
                         onChange={(e)=>{setWebsite(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Address </p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Address'
                         value={address}
                         onChange={(e)=>{setAddress(e.target.value)}}
                         ></input>
                     </div>
                </div>
                <h2 className='target'>Professional Details:</h2>
                <div className="professional-details">
                    <div className="info">
                         <p>Specialization </p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Specialization'
                         value={specialization}
                         onChange={(e)=>{setSpecialization(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Experience </p>
                         <input 
                         type='number' 
                         placeholder='Enter Your Experience'
                         value={experience}
                         onChange={(e)=>{setExperience(e.target.value)}}
                         ></input>
                     </div>
                     
                     <div className="info">
                         <p>Fee </p>
                         <input 
                         type='number' 
                         placeholder='Enter Your fee'
                         value={fee}
                         onChange={(e)=>{setFee(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Start Timing </p>
                         <input 
                         type='time' 
                         placeholder='Enter Your Start Timing of working'
                         value={startTiming}
                         onChange={(e)=>{setStartTiming(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>End Timing </p>
                         <input 
                         type='time' 
                         placeholder='Enter Your End Timing of working'
                         value={endTiming}
                         onChange={(e)=>{setEndTiming(e.target.value)}}
                         ></input>
                     </div>
                     
                     <button className='btn' onClick={()=>{handledoctorSubmit()}}>Submit</button>

                </div>
            </div>
        </div>
    </Layout>
  )
}
