const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "test";

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(12);
    hashedPassword = await bcrypt.hash(password, salt);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "24h",
    });

    return res.status(201).json({ result, token });
  } catch (error) {
    return (
      res.status(500).json({ message: "Something went wrong" }),
      console.log(error)
    );
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    return res.status(200).json({ result: oldUser, token });
  } catch (error) {
    return (
      res.status(500).json({ message: "Something went wrong" }),
      console.log(error)
    );
  }
};

exports.googleSignIn = async(req, res) => {
  const { email, name, token, googleId } = req.body;

  try {

    const oldUser = await userModel.findOne({ email });
    
    if (oldUser) {
      const result = { _id: oldUser._id.toString(),  email, name };
      return res.status(200).json({ result, token });
    }

    const result = await userModel.create({
      name,
      email,
      googleId
    });

    return res.status(201).json({ result, token });


  } catch (error) {
    return (
      res.status(500).json({ message: "Something went wrong" }),
      console.log(error)
    );
  }
};
