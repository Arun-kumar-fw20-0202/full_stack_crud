const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
userRouter.use(express.json());

userRouter.get("/", (req, res) => {
  const token = req.headers.authorization;
  const decode = jwt.verify(token.split(" ")[1], "masai");
  if (decode) {
    console.log(decode);
  }
  res.send("this is the data");
});

userRouter.post("/register", async (req, res) => {
  const { name, phone, gender, email, password, avatar } = req.body;
  const check = await UserModel.findOne({ email });
  if (check) {
    res.status(200).send({ msg: "User Alredy Exist with this Email!!!" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({
          name,
          phone,
          gender,
          email,
          avatar,
          password: hash,
        });
        await user.save();
        res.status(200).send({ msg: "user added successfuly!" });
      });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID: user._id }, "masai");
          console.log(token);
          res.status(200).send({ msg: "Login successful!!", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!!" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = userRouter;
