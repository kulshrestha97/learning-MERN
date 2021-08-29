const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const User = require("../models/user");
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Rajat K",
    email: "test@testing.com",
    password: "testingPassword",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "email name");
  } catch (error) {
    return next(new HttpError(error, 500));
  }
  res.status(200).json({ users });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  const newUser = new User({
    name,
    email,
    password,
    places: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(error, 404));
  }
  res.status(201).json({ message: "Successfully signed up the user" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Credentials entered are wrong", 401));
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
