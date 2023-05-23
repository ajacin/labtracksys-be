const express = require("express");
const { UserModel } = require("../models/UserModel");
const router = express.Router();
var jwt = require("jsonwebtoken");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.get("/", async (req, res, next) => {
  // "_id": "64230cf91f8f22d540a82fdb",
  //     "username": "jittu",
  //     "email": "jittu@yopmail.com",
  //     "password": "$2b$10$onNxtCj.6l0WAYzjDlZ/AewCQKJlOfUFbNazV4f8UoK19AKTS/h.2",
  //     "role": "USER",
  //     "firstName": "Jittu",
  //     "lastName": "Roy",
  //     "__v": 0
  try {
    delete req.body.password;
    let data = await UserModel.find(req.body);
    if (data.length > 0) {
      let response = data.map((datum) => {
        return {
          id: datum._id,
          username: datum.username,
          email: datum.email,
          role: datum.role,
          firstName: datum.firstName,
          lastName: datum.firstName,
        };
      });
      res.send({
        count: response.length,
        data: response,
      });
    }
  } catch (error) {
    console.log("in error");
    res.send({
      message: error,
    });
    next(error);
  }
});

//Registration
// async : db operations are async

router.post("/create", async (req, res) => {
  try {
    let data = new UserModel(req.body);
    await data.save();
    //save and create does the same work. Save bypasses the schema validation but create confirms the schema
    //and trigger save internally for every docs. create acts like a middleware
    res.send({
      message: "User registered",
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await UserModel.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
