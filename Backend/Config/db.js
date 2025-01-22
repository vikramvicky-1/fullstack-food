import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://vikramvicky:zeRPUdFE4R67CJe@cluster0.ge2rvvc.mongodb.net/full-stack-food"
    )
    .then(() => console.log("DB connected sucessfully"));
};
