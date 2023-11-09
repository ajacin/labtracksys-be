const express = require("express");
const router = express.Router();
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;
const { ActivityLogsModel } = require("../../models/ActivityLogsModel.ts");
router.get("/", async (req, res, next) => {
  try {
    let data = await ActivityLogsModel.find({});
    if (data.length > 0) {
      let response = data.map((datum) => {
        const { id, title, description, time, userId } = datum;
        return {
          id,
          title,
          description,
          time,
          userId,
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
    let data = new ActivityLogsModel(req.body);
    if (!req.body.time) req.body.time = new Date().toLocaleString();

    await data.save();
    //  save and create does the same work. Save bypasses the schema validation but create confirms the schema
    //  and trigger save internally for every docs. create acts like a middleware

    res.send({
      message: "Added an activity",
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete an activity
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await ActivityLogsModel.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
