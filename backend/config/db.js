import mongoose from "mongoose";

const mongodb = async () => {
  try{
  
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  }catch(error){
    console.log(error);
    console.log("Database not connected");
  }  
}
export default mongodb;