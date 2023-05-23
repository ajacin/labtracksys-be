const mongoose = require("mongoose");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

const SignupValidator = async (req, res, next) => {
  if (req.path == "/users/create") {
    const { username, email, password, role, firstName, lastName } = req.body;
    if (!(username, email, password, firstName, lastName)) {
      res.status(400).send("All inputs are mandatory");
    }

    encryptedPassword = await bcrypt.hash(password, SALTROUNDS);
    req.body.role = "USER";
    req.body.password = encryptedPassword;
    let data = await UserModel.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (data.length > 0) {
      res.send({ message: "User exists" });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = { SignupValidator };
