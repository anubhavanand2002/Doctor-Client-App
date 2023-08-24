import User from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";

export const authgetAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: true,
      message: "users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal server Error!!!" });
  }
};

export const authgetAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    return res
      .status(200)
      .json({ status: true, message: "Doctors data", doctors });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ status: true, message: "Internal server error!!" });
  }
};

export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, {
      status: status,
    });
    const userId = doctor.userId;
    const user = await User.findOne({ _id: userId });
    user.notification.push({
      type: "doctor account request updated",
      message: `Your doctor account request has been ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Account status Has been approved!!!",
      data: doctor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server Error!!!" });
  }
};
