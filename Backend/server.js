import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/FoodRoute.js";
import userRouter from "./Routes/UserRoute.js";
import "dotenv/config.js";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import path from "path";


//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors({
  origin: "https://fullstack-food-fontend.onrender.com", // Replace with your frontend's URL
}));

//DB connection
connectDB();
app.get("/", (req, res) => {
  res.send("Server is running Sucessfully");
});

//API Endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () =>
  console.log(`server is running sucessfully on port:${port}`)
);
