import React from 'react'
import './Layout.css';
import {Link} from 'react-router-dom';
import { AdminMenu, UserMenu } from '../../Data/data';
import { useSelector } from 'react-redux';
import {message,Badge} from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Layout({children}) {
  
  const navigate=useNavigate();

 const {user}=useSelector((state)=>(state.user));

 const handleClick=()=>{
   localStorage.clear();
   message.success("Logout Successfully!!");

 }

 /////for doctoe menubar
 const DoctorMenu=[
  {
      name:"Home",
      path:"/",
      icon:<ion-icon name="home-outline"></ion-icon>
  },
  {
      name:"Doctors",
      path:"/admin/doctors",
      icon:<ion-icon name="person-add-outline"></ion-icon>
  },
  {
      name:"Profile",
      path:`/doctor/profile/${user?._id}`,
      icon:<ion-icon name="person-outline"></ion-icon>
  },
]



 const sidebarMenu=
 user?.isAdmin? 
 AdminMenu:
 user?.isDoctor?
 DoctorMenu :
 UserMenu;
  return (
    <div className='layout-container'>
       <div className="main-container">
         <div className="sidebar">
            <p>DOC APP</p>
            <hr style={{color:"black"}}/>
            {
                sidebarMenu.map((menu)=>{
                    return(
                        <>
                            <div className='item'>
                            {menu.icon}
                            <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        </>
                    )
                })
            }
            <div className='item' onClick={()=>{handleClick()}}>
              <ion-icon name="log-out-outline"></ion-icon>      
              <Link to="/login">Logout</Link>
            </div>

         </div>
         <div className="other">
            <div className="header">
            <ion-icon name="notifications"
            onClick={()=>{navigate("/notification")}}
            ></ion-icon>
            <Badge count={user && user.notification.length}></Badge>
                <Link to="/profile">{user?user.name:"Not Found"}</Link>
            </div>
            <div className="content">
                {children}
            </div>
         </div>
        
       </div>
    </div>  
  )
}
