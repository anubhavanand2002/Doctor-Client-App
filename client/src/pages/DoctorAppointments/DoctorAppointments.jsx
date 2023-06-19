import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import "./DoctorAppointments.css";
import { message } from "antd";
export default function DoctorApoointments() {
  const [doctorAppointments, setDoctorAppointmnets] = useState();

  const getDoctorAppointments = () => {
    axios
      .get("http://localhost:5000/api/doctor/doctor-appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result.data.status) {
          console.log(result);
          //   console.log(result.data.message);
          setDoctorAppointmnets(result.data.doctorappointments);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  const handleStatus=(record,status)=>{
     axios.post("http://localhost:5000/api/doctor/handle-status",
     {
        appointmentId:record._id,
        status
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
      }
      else{
        message.error(result.data.message);
      }
     }).catch((error)=>{
      console.log(error);
     })
  }


  useEffect(() => {
    getDoctorAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //     title:'Name',
    //     dataIndex:"name",
    //     render:(text,record)=>(
    //         <span>
    //             {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //         </span>
    //     ),
    // },
    // {
    //     title:"phone",
    //     dataIndex:"phone",
    //     render:(text,record)=>(
    //         <span>
    //             {record.phone}
    //         </span>
    //     ),
    // },
    {
      title: "date",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}&nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          {record.status === "pending" && (
            <div style={{ display: "flex" }} className="display">
              <div>
                <button className="btn2" onClick={()=>{handleStatus(record,'approved')}}>Approved</button>
              </div>
              <div>
                <button className="btn3" onClick={()=>{handleStatus(record,'reject')}}>Reject</button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>DoctorAppointments</h1>
      <Table columns={columns} dataSource={doctorAppointments} />
    </Layout>
  );
}
