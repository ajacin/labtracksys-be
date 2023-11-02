const express = require("express");
const router = express.Router();
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;
const { ActivitiesModel } = require("../../models/ActivitiesModel.tsx");
router.get("/", async (req, res, next) => {
  try {
    let data = await ActivitiesModel.find({});
    if (data.length > 0) {
      let response = data.map((datum) => {
        return {
          id: datum._id,
          name: datum.activityName,
          description: datum.activityDescription,
        };
      });

      res.send({
        data: response,
      });
    }
  } catch (error) {
    res.send({
      message: error,
    });
    next(error);
  }
});

// Create Lab

router.post("/create", async (req, res) => {
  try {
    let data = new ActivitiesModel(req.body);
    await data.save();
    //  save and create does the same work. Save bypasses the schema validation but create confirms the schema
    //  and trigger save internally for every docs. create acts like a middleware

    res.send({
      message: "Activity Created",
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete an activity
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await ActivitiesModel.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
