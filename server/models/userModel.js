import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDoctor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  notification: { type: Array, default: [] },
  seennotification: { type: Array, default: [] },
});
const User = mongoose.model("users", userSchema);
export default User;
