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
