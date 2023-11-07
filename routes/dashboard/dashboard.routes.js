const express = require("express");
const router = express.Router();
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;
const { DashboardModel } = require("../../models/DashboardModel.ts");
router.get("/", async (req, res, next) => {
  try {
    let data = await DashboardModel.find({});
    if (data.length > 0) {
      let response = data.map((datum) => {
        return {
          id: datum._id,
          test: datum.test,
          diapers: datum.diapers,
          formula: datum.formula,
        };
      });
      //send only first and the only value
      res.send({
        data: response[0],
      });
    }
  } catch (error) {
    res.send({
      message: error,
    });
    next(error);
  }
});

// Create Dashboard entry

router.post("/create", async (req, res) => {
  try {
    const existingData = await DashboardModel.find({}); // Check if any records exist

    if (existingData.length === 0) {
      // If no records exist, create a new entry
      const data = new DashboardModel(req.body);
      await data.save();
      res.send({
        message: "Dashboard item Created",
      });
    } else {
      // If records exist, respond with "Entry already available"
      res.send({
        message: "Entry already available, please update",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await DashboardModel.deleteOne(query);

  res.send(result).status(200);
});

// Update the values of count and cost for diapers and formula
router.patch("/:id", async (req, res) => {
  const dashboardId = req.params.id;
  const updatedData = req.body; // The updated data should contain new values for "diapers" and "formula"

  try {
    const query = { _id: new ObjectId(dashboardId) };
    const updatedDashboard = await DashboardModel.findOneAndUpdate(
      query,
      updatedData,
      {
        new: true, // Return the updated document
      }
    );

    if (updatedDashboard) {
      res.json({ message: "Dashboard item updated", data: updatedDashboard });
    } else {
      res.status(404).json({ message: "Dashboard item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Replace an existing entry
router.put("/:id", async (req, res) => {
  const dashboardId = req.params.id;
  const updatedData = req.body; // The new data to replace the existing record

  try {
    const query = { _id: new ObjectId(dashboardId) };
    const replacedDashboard = await DashboardModel.findOneAndReplace(
      query,
      updatedData,
      {
        new: true, // Return the replaced document
      }
    );

    if (replacedDashboard) {
      res.json({ message: "Dashboard item replaced", data: replacedDashboard });
    } else {
      res.status(404).json({ message: "Dashboard item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
