import React from 'react'
import './DoctorList.css';
import { useNavigate } from 'react-router-dom';
export default function DoctorList({doctor}) {
    const navigate=useNavigate();

    const handleAppointment=()=>{
        navigate(`/doctor/book-appointment/${doctor._id}`);
    }
  return (
    <div className='doctorlist-container' onClick={()=>{handleAppointment()}}>
       <div className="main-container">
         <div className="name">
            <p>Dr {doctor.firstName} {doctor.lastName}</p>
         </div>
         <div className="about">
            <div className="specialization">
                <p>
                    <span className="name1">Specialization:</span>
                    {doctor.specialization}
                </p>
            </div>
            <div className="fee">
                <p>
                    <span className="name1">Fee charge:</span>
                    Rs.{doctor.feePerConsultation}
                </p>
            </div>
            <div className="experience">
                <p>
                    <span className="name1">Experience:</span>
                    {doctor.experience}years
                </p>
            </div>
            <div className="timing">
                <p>
                    <span className="name1">Timing:</span>
                    {doctor.startTiming}:{doctor.endTiming}
                </p>
            </div>
       </div>
       </div>
    </div>
  )
}
