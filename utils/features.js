import jwt from "jsonwebtoken";

export const SendCookie =(user, res, message, statusCode=200)=>{
    const token = jwt.sign({_id:user._id}, process.env.secret_key);

  res.status(statusCode).cookie("token", token, {
    httpOnly:true,
    maxAge:15*60*1000,
    sameSite: process.env.node_env==="Development" ? "lax" : "none",
    secure:process.env.node_env==="Development" ? false : true,
  }).json({
    success: true,
    message,
  });

}