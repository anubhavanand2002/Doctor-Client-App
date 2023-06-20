import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Tabs, message } from 'antd';
import './Notification.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Notification() {
     
    const {user}=useSelector((state)=>(state.user));
    const handleMarkAllDelete=()=>{
        axios.post("https://doctorapp-api.vercel.app/api/auth/delete-all-notification",{},{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token'),
            }
          }).then((result)=>{
            if(result.data.status)
            {
               message.success(result.data.message);
            }
            else
            {
                message.error(result.data.message);
            }
          }).catch((error)=>{
            console.log(error);
          })
    }
    const handleMarkAllRead=()=>{
        axios.post("https://doctorapp-api.vercel.app/api/auth/get-all-notification",{},{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token'),
            }
          }).then((result)=>{
            if(result.data.status)
            {
               message.success(result.data.message);
            }
            else
            {
                message.error(result.data.message);
            }
          }).catch((error)=>{
            console.log(error);
          })
    }
  return (
    <Layout>
        <h4 className='notification'>Notification</h4>
        <Tabs>
            <Tabs.TabPane tab="UnRead" key={0}>
                <div className='row1'>
                    <h4 className='mark' onClick={()=>{handleMarkAllRead()}}>
                        Mark All Read
                    </h4>
                </div>
                {
                   user?.notification.map((notificationMsg)=>{
                         return(
                            <>
                               <p className='card'>{notificationMsg.message}</p>
                            </>
                         )
                   })
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className='row2'>
                    <h4 className='mark' onClick={()=>{handleMarkAllDelete()}}>
                       Delete All Read
                    </h4>
                </div>
                {
                   user?.seennotification.map((notificationMsg)=>{
                         return(
                            <>
                               <p className='card'>{notificationMsg.message}</p>
                            </>
                         )
                   })
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}
