import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
//app.get(abdgdh,(req,res)=>{}) this is same function to be replaced

//for registering the data of user
export const register = async (req, res) => {
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
    const user = new User({
      name,
      email,
      password: hashedPassword,
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
