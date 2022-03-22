import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";   //后端不能省略js后缀

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) return res.status(404).json({ message: "User does not exist" });

    const isPasswordsValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordsValid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "jwttest", { expiresIn: "1h" });

    res.status(200).json({ result: existingUser,token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password ,firstName, lastName,confirmPassword} = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (password!==confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password,12);

    const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});

    const token = jwt.sign({ email: result.email, id: result._id }, "jwttest", { expiresIn: "1h" });

    res.status(200).json({ result: result,token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
