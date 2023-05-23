const express = require("express");
const { UserModel } = require("../models/UserModel");
const router = express.Router();
var jwt = require("jsonwebtoken");
const VerifyToken = require("../middlewares/VerifyToken");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.post("/", async (req, res) => {
  try {
    console.log("in post login");
    // let data = await UserModel.find({
    //   $and: [{ email: req.body.email }, { password: req.body.password }],
    // });
    if (res.locals.user) {
      //setting expiry to 900s which is 15 seconds. Other values 1h, 1d,
      const option = {
        expiresIn: "15s",
      };
      const requestTokenOption = {
        expiresIn: "1y",
      };
      var token = jwt.sign(req.body, process.env.ACCESS_TOKEN_KEY, option);
      var refreshToken = jwt.sign(
        req.body,
        process.env.REFRESH_TOKEN_KEY,
        requestTokenOption
      );
      res.send({
        message: "Login success",
        token: token,
        refreshToken: refreshToken,
        userDetails: {
          username: res.locals.user.username,
          role: res.locals.user.role,
          firstName: res.locals.user.firstName,
          lastName: res.locals.user.lastName,
        },
      });
    } else {
      res.send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.send({
      message: error,
    });
  }
});

module.exports = router;
