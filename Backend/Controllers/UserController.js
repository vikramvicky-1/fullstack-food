import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const fetchUser = await userModel.findOne({ email });
    if (!fetchUser) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const isMatch = await bcrypt.compare(password, fetchUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = createToken(fetchUser._id);
    res.json({
      success: true,
      token,
      userName: fetchUser.name,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error" });
  }
};

//creating JWT token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  //checking if user already exists
  const exists = await userModel.findOne({ email });
  try {
    if (exists) {
      return res.json({ success: false, message: "Email already exists" });
    }
    //validating email && password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    if (name.length > 12) {
      return res.json({ success: false, message: "Enter a small username" });
    }
    //hasing password

    const saltRounds = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //creating user

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, signupUser };
