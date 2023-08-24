import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import moment from "moment";
import cloudinary from "cloudinary";
//app.get(abdgdh,(req,res)=>{}) this is same function to be replaced

//for registering the data of user
export const register = async (req, res) => {
  // console.log(req.files.image);
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // User already exists
      return res
        .status(201)
        .json({ status: false, message: "User Already exist!!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // The second argument is the saltRounds
    const result = await cloudinary.v2.uploader.upload(
      req.files.image.tempFilePath
    );
    const user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: result.secure_url,
    });
    await user.save();
    return res
      .status(200)
      .json({ status: true, message: "Registered Successfully!!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(201)
        .json({ status: false, message: "User didn't exist!!" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(201)
        .json({ status: false, message: "Error in Email or Password!!" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ status: true, message: "Login Successfully!!", token });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const authController = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res
        .status(201)
        .json({ status: false, message: "User not found!!" });
    } else {
      return res.status(200).json({
        status: true,
        message: "User found successfully!!",
        data: {
          user,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, json: "Internal Server Error!!!" });
  }
};

export const authDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    console.log(newDoctor);
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    console.log(adminUser);
    const notification = adminUser.notification;
    notification.push({
      type: "apply doctor request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor account`,
      data: {
        Doctorid: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onclick: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    return res.status(200).json({
      status: true,
      message: "Doctor Form has applied successfully!!",
    });
  } catch (error) {
    return res
      .status(501)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const authgetAllNotificationController = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    return res.status(200).json({
      status: true,
      message: "All Notifications marked as Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const authdeleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.notification = [];
    user.seennotification = [];
    const Updateduser = await user.save();
    return res.status(200).json({
      status: true,
      message: "All Notification Deleted successfully",
      data: Updateduser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error!!" });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "Approved" });
    return res.status(200).json({
      status: true,
      message: "Doctor info is generated",
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal Server error!!" });
  }
};

export const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "YYYY-MM-DD").toISOString();
    req.body.time = moment(req.body.time, "HH-mm").toISOString();
    req.body.status = "pending";
    const newBooking = new appointmentModel(req.body);
    await newBooking.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New Appointment request",
      message: `A new request from ${req.body.userInfo.name} for a appointment`,
    });
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Appointment Booked Successfully!!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal Server error!!" });
  }
};

export const checkingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "YYYY-MM-DD").toISOString();
    const fromTime = moment(req.body.time, "HH-mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH-mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(201).json({
        status: false,
        message: "Appointments not available at this time!!",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Appointments available!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "internal Server error!!!" });
  }
};

export const getUserAppointmentListController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    return res.status(200).json({
      status: true,
      message: "data received successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};
