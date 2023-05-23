const mongoose = require("mongoose");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");

const UserAuthentication = async (req, res, next) => {
  if (req.path == "/login") {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.locals.user = user;
      next();
    } else {
      res.send({ message: "Invalid user" });
    }
  } else {
    next();
  }
};

module.exports = { UserAuthentication };
