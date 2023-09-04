import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class authController {
  static userRegister = async (req, res) => {
    const { name, location, email, password } = req.body;
    try {
      if (name && location && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (!isUser) {
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          const newUser = new authModel({
            name: name,
            location: location,
            email: email,
            password: hashedPassword,
          });
          const userSaved = await newUser.save();
          if (userSaved) {
            return res.status(201).json({
              message: "User registered successfully!",
              user: userSaved,
            });
          }
        } else {
          return res.status(400).json({ message: "user already exists!" });
        }
      } else {
        return res.status(400).json({ message: "All Fiels are required!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          if (
            email === isUser.email &&
            (await bcryptjs.compare(password, isUser.password))
          ) {
            const authToken = jwt.sign(
              { userID: isUser._id },
              process.env.SECRET_KEY,
              {
                expiresIn: "2d",
              }
            );
            const email = isUser.email;
            return res.status(200).json({
              message: "Login Successfull!",
              authToken,
              email,
            });
          } else {
            return res.status(400).json({ message: "Invalid password!" });
          }
        } else {
          return res.status(400).json({ message: "Wrong credentials!" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    try {
      if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(newPassword, genSalt);
          await authModel.findByIdAndUpdate(req.user._id, {
            password: hashedPassword,
          });
          return res
            .status(200)
            .json({ message: "Password changed successfully!" });
        } else {
          return res
            .status(400)
            .json({ message: "Both passwords should match!" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default authController;
