const express = require("express");
const { UserModel } = require("../models/UserModel");
const router = express.Router();
var jwt = require("jsonwebtoken");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.post("/", async (req, res) => {
  try {
    console.log("in post refresh token");
    if (res.locals.user) {
      //setting expiry to 900s which is 15 seconds. Other values 1h, 1d,
      const option = {
        expiresIn: "1h",
      };
      const requestTokenOption = {
        expiresIn: "30d",
      };
      var token = jwt.sign(req.body, process.env.ACCESS_TOKEN_KEY, option);
      var refreshToken = jwt.sign(
        req.body,
        process.env.REFRESH_TOKEN_KEY,
        requestTokenOption
      );
      console.log(
        "sending response: refresh.routes:Refresh token issue success"
      );
      res.send({
        message: "Refresh token issue success",
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
      console.log(
        "sending response: refresh.routes:Failed to issue Refresh token"
      );
      res.send({ message: "Failed to issue Refresh token" });
    }
  } catch (error) {
    res.send({
      message: error,
    });
  }
});

module.exports = router;
