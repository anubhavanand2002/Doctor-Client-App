import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import User from "../models/userModel.js";

export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    return res.status(200).json({
      status: true,
      message: "Get Data Successfully!!",
      doctor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const updateDoctorInfoController = async (req, res) => {
  try {
    const id = req.body.userId;
    const updated_doctor = await doctorModel.findOneAndUpdate(
      { userId: id },
      req.body
    );
    console.log(updated_doctor);
    return res.status(200).json({
      status: true,
      message: "Doctor Info has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    return res.status(200).json({
      status: true,
      message: "Find data successfully",
      doctor,
    });
  } catch (error) {
    console.log(erorr);
    return res
      .status(501)
      .json({ status: false, message: "Internal server error!!" });
  }
};

export const getDoctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const doctorId = doctor._id;
    const doctorappointments = await appointmentModel.find({
      doctorId: doctorId,
    });
    return res.status(200).json({
      status: true,
      message: "Doctor Appointments are found successfully",
      doctorappointments,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal server Error!!!" });
  }
};

export const authHandleStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await User.findOne({ _id: appointments.userId });
    console.log(user);
    const notification = user.notification;
    notification.push({
      type: "Status Updated",
      message: `Your Appointment status has been updates ${status}`,
    });
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Appointment status has been updated successfully!!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: "internal server error!!!",
    });
  }
};
