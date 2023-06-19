import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import moment from 'moment';
export default function Appointments() {

 const[Appointments,setAppointments]=useState();
 const {user}=useSelector((state)=>(state.user));

const getAppointments=()=>{
   axios.get("http://localhost:5000/api/auth/getUserAppointmentList",
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
        setAppointments(result.data.appointments);
    }
   }).catch((error)=>{
    console.log(error);
   })
}

 useEffect(()=>{
   getAppointments();
 },[])


 const columns=[
    {
        title:'ID',
        dataIndex:'_id'
    },
    {
        title:'Name',
        dataIndex:"name",
        render:(text,record)=>(
            <span>
                {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
        ),
    },
    {
        title:"phone",
        dataIndex:"phone",
        render:(text,record)=>(
            <span>
                {record.phone}
            </span>
        ),
    },
    {
        title:"date",
        dataIndex:"date",
        render:(text,record)=>(
            <span>
                {moment(record.date).format('DD-MM-YYYY')}&nbsp;
                {moment(record.time).format('HH:mm')}
            </span>
        )
    },
    {
        title:"Status",
        dataIndex:"status"
    }
 ]

  return (
    <Layout>
     <h1>Appointmnet List</h1> 
     <Table columns={columns} dataSource={Appointments}/>
    </Layout>
  )
}
