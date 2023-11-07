const { UserModel } = require("./UserModel");
const { ActivitiesModel } = require("./ActivitiesModel.ts");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const activityLogsSchema = mongoose.Schema({
  activityId: {
    type: Schema.Types.ObjectId,
    ref: ActivitiesModel,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: new Date(), required: true },
  userId: { type: Schema.Types.ObjectId, ref: UserModel },
});

const ActivityLogsModel = mongoose.model("activityLogs", activityLogsSchema);

module.exports = { ActivityLogsModel };
