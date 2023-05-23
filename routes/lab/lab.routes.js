const express = require("express");
const { LabModel } = require("../../models/LabModel");
const router = express.Router();
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

router.get("/", async (req, res, next) => {
  try {
    let data = await LabModel.find({});
    if (data.length > 0) {
      let response = data.map((datum) => {
        return {
          id: datum._id,
          labname: datum.labname,
          labregisteredname: datum.labregisteredname,
          place: datum.place,
          phone: datum.phone,
          email: datum.email,
        };
      });
      res.send({
        data: response,
      });
    }
  } catch (error) {
    console.log("in error: get lab");
    res.send({
      message: error,
    });
    next(error);
  }
});

//Create Lab
// async : db operations are async

router.post("/create", async (req, res) => {
  try {
    let data = new LabModel(req.body);
    await data.save();
    //save and create does the same work. Save bypasses the schema validation but create confirms the schema
    //and trigger save internally for every docs. create acts like a middleware
    res.send({
      message: "Lab Created",
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await LabModel.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
