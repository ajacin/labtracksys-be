const mongoose = require("mongoose");

const testGroupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  testIds: [{ type: String }],
  createdBy: { type: String, default: "System" },
});

//testGroup is the collection name
const TestGroupModel = mongoose.model("testGroup", testGroupSchema);

module.exports = { TestGroupModel };
