import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return res.status(400).json({ message: "user alredy exist" });
    }

    let hashpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(201).json({
      message: "user register successfullly",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try{
    const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid credential" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  });
  
  res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }catch(err){
    res.status(500).json({ message : err.message });
  }
};

export const logout = async(req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message : "logout successfully"});
};
  