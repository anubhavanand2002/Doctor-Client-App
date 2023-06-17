import doctorModel from "../models/doctorModel.js";

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
