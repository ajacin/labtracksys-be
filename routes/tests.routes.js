const express = require("express");
const { TestModel } = require("../models/TestModel");
const router = express.Router();
const { CheckRoles } = require("../middlewares/access-control/CheckRoles");
const { SetUser } = require("../middlewares/SetUser");
const Roles = require("../constants/Roles");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.get(
  "/",
  SetUser,
  CheckRoles([Roles.SUPERUSER, Roles.ADMIN, Roles.USER]),
  async (req, res, next) => {
    try {
      console.log("fetching tests");
      let response = await TestModel.find({});
      if (response.length > 0) {
        // let response = data.map((datum) => {
        //   return {
        //     id: datum._id,
        //     username: datum.username,
        //     email: datum.email,
        //     role: datum.role,
        //     firstName: datum.firstName,
        //     lastName: datum.lastName,
        //   };
        // });

        res.send({
          data: response ? response : [],
        });
        return;
      } else {
        res.send({
          message: "No tests available",
        });
      }
    } catch (error) {
      console.log("error while fetching tests", error);

      res.send({
        message: error,
      });
      next(error);
    }
  }
);

//Create a test
router.post(
  "/create",
  SetUser,
  CheckRoles([Roles.SUPERUSER, Roles.ADMIN, Roles.USER]),
  async (req, res) => {
    try {
      let data = new TestModel(req.body);
      await data.save();
      //save and create does the same work. Save bypasses the schema validation but create confirms the schema
      //and trigger save internally for every docs. create acts like a middleware

      res.send({
        message: "Test Created",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete a user
// router.delete("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };

//   let result = await TestModel.deleteOne(query);

//   res.send(result).status(200);
// });

module.exports = router;
