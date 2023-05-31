const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resultType: { type: String }, //range, string
  unit: { type: String }, //"10^12/L"
  minRange: { type: Number },
  maxRange: { type: Number },
  pregnancyMinRange: { type: Number },
  pregnancyMaxRange: { type: Number },
  femaleMinRange: { type: Number },
  femaleMaxRange: { type: Number },
  maleMinRange: { type: Number },
  maleMaxRange: { type: Number },
  childMinRange: { type: Number },
  childMaxRange: { type: Number },
  newBornMinRange: { type: Number },
  newBornMaxRange: { type: Number },
  newBornMaxAgeMonths: { type: Number },
  childMaxAge: { type: Number },
  resultStrings: [{ type: String }], //e.g present not present
  createdBy: { type: String, default: "System" },
});

//test is the collection name
const TestModel = mongoose.model("test", testSchema);

module.exports = { TestModel };
