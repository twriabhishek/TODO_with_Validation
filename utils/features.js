import jwt from "jsonwebtoken";

export const SendCookie =(user, res, message, statusCode=200)=>{
    const token = jwt.sign({_id:user._id}, "rfghjhvcxdsrtyhj");

  res.status(statusCode).cookie("token", token, {
    httpOnly:true,
    maxAge:15*60*1000,
  }).json({
    success: true,
    message,
  });

}