const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Rajat K",
    email: "test@testing.com",
    password: "testingPassword",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Credentials entered are wrong", 401);
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
