import React,{useState,useEffect} from 'react'
import Layout from '../../../components/Layout/Layout'
import axios from 'axios';
import { Table } from 'antd';
import './Doctors.css';
import {message} from 'antd';
export default function Doctors() {
  const[doctors,setDoctors]=useState("");

  const handleClick=(data)=>{
    const {record,status}=data;
    axios.post("https://doctorapp-api.vercel.app/api/admin/changeAccountStatus",{
      doctorId:record._id,
      status:status
    },{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token"),
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
    }).catch((error)=>
    {
      console.log(error);
    })
  }

 const getDoctors=()=>{
   axios.get("https://doctorapp-api.vercel.app/api/admin/getAllDoctors",{
    headers:{
        Authorization:"Bearer "+localStorage.getItem("token"),
    }
   }).then((result)=>{
     if(result.data.status)
     {
        console.log(result);
        setDoctors(result.data.doctors);
     }
   }).catch((error)=>{
    console.log(error);
   })
 }

useEffect(()=>{
    getDoctors();
},[])

 const columns=[
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => (
      <span>{record.firstName} {record.lastName}</span>
    ),
  },
  
    {
      title:"Status",
      dataIndex:"status",
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title:"phone",
      dataIndex:"phone",
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record)=>(
        <div className="class">
            {
              record.status==="pending"?
              (<button className='btn-btn-success' onClick={()=>{handleClick({record,status:"Approved"})}}>Approve</button>):
              (<button className='btn-btn-danger'>Reject</button>)
            }
        </div>
      )
    }
    
 ]
  return (
    <Layout>
      <h1 className='doctors'>Doctors</h1>
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}
