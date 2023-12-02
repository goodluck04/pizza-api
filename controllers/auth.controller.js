import bcryptjs from "bcryptjs";
import prisma from "../utils/db.js";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// create user
export const signup = async (req, res, next) => {
  try {
    // getting name,email and password from body
    const { name, email, password, address } = req.body;

    //   if any if fields are missing send message all fields are required
    if (!(name || email || password || address)) {
      return next(ErrorHandler(400, "All fields are required!"));
    }

    // check if user already exist with that email
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // if user exist send message and return
    if (findUser) {
      return next(ErrorHandler(400, "Email already exist"));
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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //   if any if fields are missing send message all fields are required
    if (!(email || password)) {
      return next(new (400, "all fields required")());
    }
    // searching in db for that valid user
    const validUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // if user not foud in user is not  db
    if (!validUser) return next(ErrorHandler(404, "User not found!"));
    // comparing user password with validUser password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // if password do no match then send error
    if (!validPassword) return next(ErrorHandler(401, "Wrong credentials!"));
    // if password match then authenticate the user
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    // remove password before sending to client
    // destructure validUser then send data without password
    const { password: pass, ...rest } = validUser; //it will avoid password in res

    // sending the user and cookie/token to the user
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
