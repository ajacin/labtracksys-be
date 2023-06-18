const express = require("express");
const { TestGroupModel } = require("../models/TestGroupModel");
const router = express.Router();
const { CheckRoles } = require("../middlewares/access-control/CheckRoles");
const { SetUser } = require("../middlewares/SetUser");
const Roles = require("../constants/Roles");
const { ValidateTestIds } = require("../middlewares/ValidateTestIds");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.get(
  "/",
  SetUser,
  CheckRoles([Roles.SUPERUSER, Roles.ADMIN, Roles.USER]),
  async (req, res, next) => {
    try {
      console.log("fetching test groups");
      let response = await TestGroupModel.find({});
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

        return res.send({
          data: response ? response : [],
        });
      } else {
        return res.send({
          message: "No test groups available",
        });
      }
    } catch (error) {
      console.log("error while fetching test groups", error);

      return res.send({
        message: error,
      });
      // next(error);
    }
  }
);

//Create a testgroup
router.post(
  "/create",
  SetUser,
  ValidateTestIds,
  CheckRoles([Roles.SUPERUSER, Roles.ADMIN, Roles.USER]),
  async (req, res) => {
    try {
      let data = new TestGroupModel(req.body);

      await data.save();
      //save and create does the same work. Save bypasses the schema validation but create confirms the schema
      //and trigger save internally for every docs. create acts like a middleware

      return res.send({
        message: "Test Group Created",
      });
    } catch (error) {
      console.log(error);
      return res.send({
        message: "Failed to save Test Group",
        error: error ?? "error",
      });
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
