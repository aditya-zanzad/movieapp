import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// first register

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createuser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      createuser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    // now create a token and send it to the user

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    next(error);
  }
};
