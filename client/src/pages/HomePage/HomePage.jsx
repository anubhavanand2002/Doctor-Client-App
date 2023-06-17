import React,{useEffect,useState}  from 'react'
import axios from 'axios';
import './HomePage.css';
import Layout from '../../components/Layout/Layout';


const HomePage = () => {
 

  const[name,setName]=useState("");

  const getUser=()=>{
      axios.post("http://localhost:5000/api/auth/getUserData",{},{
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token"),
        },
      }).then((result)=>{
        if(result.data.status)
        {
           setName(result.data.data.name);
           console.log(result);
        }
        else{
          console.log(result.data.message);
        }
      }).catch((error)=>{
        console.log(error);
      })
  }


  useEffect(()=>{
     getUser();
  },[])

  return (
    <Layout>
       <h1>Home Paage</h1>
    </Layout>
  )
}

export default HomePage
