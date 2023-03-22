import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//app.get(abdgdh,(req,res)=>{}) this is same function to be replaced
//for registering the data of user
const register = (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email: email })
    .then((result) => {
      console.log("Email is used before");
      return res
        .status(200)
        .json({ status: false, message: "User has already registered" });
    })
    .catch((err) => {
      console.log(err);
    });
  //username passoword
  let newUser = new User({ name: username, email, password });
  bcrypt
    .genSalt(10)
    .then((result) => {
      bcrypt
        .hash(password, result)
        .then((res) => {
          newUser.password = res;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  newUser
    .save()
    .then((resp) => {
      console.log("User data has saves successfuly");
      return res
        .status(201)
        .json({ status: "true", message: "registered successfully!" });
    })
    .catch((e) => {
      console.log(e);
      return res
        .status(500)
        .json({ status: "false", message: "Internal Server error!" });
    });

};

//forlogin function
const login=(req,res)=>{
  const{email,password}=req.body;
  User.findOne(email).then((res)=>{
    if(!res){
        return res.
        status(202)
        .json({status:"false",message:"Invalid credentials"})
    }
    console.log(res);
    bcrypt.compare(res.password,password).then((result)=>{
        console.log(result);
        if(!result)
        {
            return res.
            status(202)
            .json({status:"false",message:"Invalid credentials"});
        }
    })
    .catch((err)=>{
        console.log(err);
    })
   const payload={
     id:res.id,
     username:res.name,
     createdAt:new Date().getTime()
   }
   jwt.sign(payload,process.env.JWT_SECRET);
   return res.
   status(203)
   .json({status:"true",message:"Login successfully"});
  })
  .catch((err)=>{
    console.log(err);
  })
}

export default {register,login};
