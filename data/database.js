import mongoose from "mongoose";
// console.log(process.env.mongo_uri);

export const connectDB=()=>{
    mongoose
  .connect(process.env.mongo_uri, {
    dbName: "backendTODO",
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((e) => console.log(e));
}