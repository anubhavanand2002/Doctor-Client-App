import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import './UserProfile.css';
export default function UserProfile() {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="userprofile-container">
        <div className="main-container">
        <div className="name">
          <h1>Name: {user?.name}</h1>
        </div>
        <div className="email">
          <h1>Email: {user?.email}</h1>
        </div>
        <div className="notification">
          <h1>Notification: {user?.notification.length}</h1>
        </div>
        <div className="seen-notification">
          <h1>Seen-Notification: {user?.seennotification.length}</h1>
        </div>
        </div>
      </div>
    </Layout>
  );
}
