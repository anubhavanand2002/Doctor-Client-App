import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Authorization token missing!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ status: false, message: "Authentication failed!" });
      }
      req.body.userId = decode.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Authentication failed!" });
  }
};
