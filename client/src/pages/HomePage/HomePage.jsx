import React,{useEffect,useState}  from 'react'
import axios from 'axios';
import './HomePage.css';
import Layout from '../../components/Layout/Layout';
import DoctorList from '../../components/DoctorList/DoctorList';

const HomePage = () => {
 

  const[doctors,setDoctors]=useState("");

  const getDoctorData=()=>{
      axios.get("http://localhost:5000/api/auth/getAllDoctors",{
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token"),
        },
      }).then((result)=>{
        if(result.data.status)
        {
          console.log(result);
           setDoctors(result.data.doctors);
        }
        else{
          console.log(result.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      })
  }
 



 

  useEffect(()=>{
     getDoctorData();
     
  },[])
  


  return (
    <Layout>
      {
        doctors && doctors.map((doctor) => (
          <DoctorList doctor={doctor} />
        ))
      }

    </Layout>
  )
}

export default HomePage
