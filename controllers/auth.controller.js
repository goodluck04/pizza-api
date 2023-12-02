import bcryptjs from "bcryptjs";
import prisma from "../utils/db.js";
import { ErrorHandler } from "../utils/error.js";

// create user
export const signup = async (req, res, next) => {
  try {
    // getting name,email and password from body
    const { name, email, password, address } = req.body;

    //   if any if fields are missing send message all fields are required
    if (!(name || email || password || address)) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // check if user already exist with that email
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // if user exist send message and return
    if (findUser) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // hashing the password with salt 10
    const hashedPassword = bcryptjs.hashSync(password, 10);

    //   save the user info in database
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        address: address,
        password: hashedPassword,
      },
    });
    // after saving user data send the success message to the user
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // here we are using next middleware to handle error
    next(ErrorHandler(550, `[SIGNUP ERROR]: ${error}`));
  }
};
