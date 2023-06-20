import React,{useState,useEffect} from 'react'
import Layout from '../../../components/Layout/Layout'
import axios from 'axios';
import { Table } from 'antd';
import './Users.css';
export default function Users() {
 const[user,setUser]=useState("");

 const getUsers=()=>{
   axios.get("https://doctorapp-api.vercel.app/api/admin/getAllUsers",{
    headers:{
        Authorization:"Bearer "+localStorage.getItem("token"),
    }
   }).then((result)=>{
     if(result.data.status)
     {
        console.log(result);
        setUser(result.data.users);
     }
   }).catch((error)=>{
    console.log(error);
   })
 }

useEffect(()=>{
    getUsers();
},[])

//antd table column
 const columns=[
    {
        title:"Name",
        dataIndex:"name",
        render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
        title:"Email",
        dataIndex:"email",
        render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
        title:"Doctor",
        dataIndex:"isDoctor",
        render:(text,record)=>(
           <span style={{ fontSize: "16px" }}>{record.isDoctor? 'Yes':'No'}</span>
        )
    },
    {
        title:"Actions",
        dataIndex:"actions",
        render:(text,record)=>(
            <div className='user'>
              <button className='btn-btn-danger'>Block</button>
            </div>
        )
    },
 ];
  return (
    <Layout>
      <h1>Users</h1>
      <Table columns={columns} dataSource={user}/>
    </Layout>
  )
}
