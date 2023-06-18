const mongoose = require("mongoose");
const { Schema } = mongoose;
const { TestModel } = require("./TestModel");

const testGroupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  //   testIds: [{ type: String }],
  createdBy: { type: String, default: "System" },
  testIds: [{ type: Schema.Types.ObjectId, ref: TestModel }],
});

//testGroup is the collection name
const TestGroupModel = mongoose.model("testGroup", testGroupSchema);

module.exports = { TestGroupModel };
