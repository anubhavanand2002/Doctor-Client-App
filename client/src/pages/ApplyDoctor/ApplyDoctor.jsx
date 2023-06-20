import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import './ApplyDoctor.css';
import axios from 'axios';
import {message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ApplyDoctor() {

    const {user}=useSelector((state)=>(state.user));
    const navigate=useNavigate();

    const[firstname,setFirstName]=useState("");
    const[lastname,setLastName]=useState("");
    const[number,setNumber]=useState("");
    const[email,setEmail]=useState("");
    const[website,setWebsite]=useState("");
    const[address,setAddress]=useState("");
    const[specialization,setspecialization]=useState("");
    const[experience,setExperience]=useState("");
    const[fee,setFee]=useState("");
    const[startTiming,setstartTiming]=useState("");
    const[endTiming,setendTiming]=useState("");

    // const [firstname, setFirstName] = useState('');
        const isRequired = true;
    const handledoctorSubmit=(e)=>{
    console.log({firstname,lastname,number,email,website,address,specialization,experience,fee,startTiming,endTiming});
      axios.post("https://doctorapp-api.vercel.app/api/auth/apply-doctor",{
        userId:user._id,
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
         headers:
         {
            Authorization:"Bearer "+localStorage.getItem("token"),
         },
      }
      ).then((result)=>{
        if(result.data.status)
        {
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
    <Layout>
        <div className="apply-doctor-container">
            <div className="main-container">
            <h2>Personal Details:</h2>
                <div className="personal-details">
                <div className="info">
                <p>
                    First Name {isRequired && <span style={{ color: 'red' }}>*</span>}
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
                         <p>Last Name {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Lastname'
                         value={lastname}
                         onChange={(e)=>{setLastName(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Phone {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='text' 
                         placeholder='Enter Your PhoneNumber'
                         value={number}
                         onChange={(e)=>{setNumber(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Email {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
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
                         <p>Address {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
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
                         <p>Specialization {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='text' 
                         placeholder='Enter Your Specialization'
                         value={specialization}
                         onChange={(e)=>{setspecialization(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Experience {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='number' 
                         placeholder='Enter Your Experience'
                         value={experience}
                         onChange={(e)=>{setExperience(e.target.value)}}
                         ></input>
                     </div>
                     
                     <div className="info">
                         <p>Fee {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='number' 
                         placeholder='Enter Your fee'
                         value={fee}
                         onChange={(e)=>{setFee(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>Start Timing {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='time' 
                         placeholder='Enter Your Start Timing of working'
                         value={startTiming}
                         onChange={(e)=>{setstartTiming(e.target.value)}}
                         ></input>
                     </div>

                     <div className="info">
                         <p>End Timing {isRequired && <span style={{ color: 'red' }}>*</span>}</p>
                         <input 
                         type='time' 
                         placeholder='Enter Your End Timing of working'
                         value={endTiming}
                         onChange={(e)=>{setendTiming(e.target.value)}}
                         ></input>
                     </div>
                     
                     <button className='btn' onClick={()=>{handledoctorSubmit()}}>Submit</button>

                </div>
            </div>
        </div>
    </Layout>
  )
}






// firstName:{
//     type:String,
//     required:[true,'first namee is required']
//   },
//   lastName:{
//       type:String,
//       required:[true,'last name is required']
//   },
//   phone:{
//       type:String,
//       required:[true,'phone number is required']
//   },
//   email:{
//      type:String,
//      required:[true,'email is required']
//   },
//   website:{
//       type:String,
//   },
//   address:{
//       type:String,
//       required:[true,'address is required']
//   },
//   specialization:{
//       type:String,
//       required:[true,'specialization is required']
//   },
//   experience:{
//       type:String,
//       required:[true,'experience is required']
//   },
//   feePerConsultation:{
//       type:Number,
//       required:[true,'fee is required']
//   },
//   timings:{
//       type:Object,
//       required:[true,'work timing is required']
//   },
