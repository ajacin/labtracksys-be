const mongoose = require("mongoose");

const activitiesSchema = mongoose.Schema({
  activityName: { type: String, required: true },
  activityDescription: { type: String },
  active: { type: Boolean, required: false, default: true },
});

const ActivitiesModel = mongoose.model("activites", activitiesSchema);

module.exports = { ActivitiesModel };
