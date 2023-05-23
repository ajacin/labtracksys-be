const mongoose = require("mongoose");

const labSchema = mongoose.Schema({
  labname: { type: String, required: true },
  labregisteredname: { type: String },
  place: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
});

const LabModel = mongoose.model("lab", labSchema);

module.exports = { LabModel };
