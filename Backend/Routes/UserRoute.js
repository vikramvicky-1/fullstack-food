import express from "express";
import { loginUser, signupUser } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);

export default userRouter;
