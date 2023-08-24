import React, { useState } from "react";
import "./Layout.css";
import { Link } from "react-router-dom";
import { AdminMenu, UserMenu } from "../../Data/data";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
export default function Layout({ children }) {
  const navigate = useNavigate();
  const [sideBarActive, setSideBarActive] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleClick = () => {
    localStorage.clear();
    message.success("Logout Successfully!!");
  };

  const handleMenu = () => {
    setSideBarActive(!sideBarActive);
  };
  const handleCross = () => {
    setSideBarActive(false);
  };
  /////for doctoe menubar
  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <ion-icon name="home-outline"></ion-icon>,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <ion-icon name="list-outline"></ion-icon>,
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <ion-icon name="person-outline"></ion-icon>,
    },
  ];

  const sidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;
  return (
    <div className="layout-container">
      <div className="main-container">
        <div className={`sidebar ${sideBarActive && "open"}`}>
          <div className="cut">
            <p>DOC APP</p>
            <ion-icon
              name="arrow-back-outline"
              onClick={() => {
                handleCross();
              }}
            ></ion-icon>
          </div>
          <hr style={{ color: "black" }} />
          {sidebarMenu.map((menu) => {
            return (
              <>
                <div className="item">
                  {menu.icon}
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              </>
            );
          })}

          <div
            className="item"
            onClick={() => {
              handleClick();
            }}
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <Link to="/login">Logout</Link>
          </div>
        </div>

        <div className="other">
          <div className="header">
            <div className="sidebar2">
              <div className="menu">
                <ion-icon
                  name="menu-outline"
                  onClick={() => {
                    handleMenu();
                  }}
                ></ion-icon>
              </div>
            </div>
            <div className="sidebar1">
              <div className="notifi">
                <ion-icon
                  name="notifications"
                  onClick={() => {
                    navigate("/notification");
                  }}
                ></ion-icon>
                <Badge count={user && user.notification.length} className="badge"></Badge>
              </div>
              <Avatar size={60} src={user?.avatar} />
              <Link to="/profile">{user ? user.name : "Not Found"}</Link>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
