const mongoose = require("mongoose");

const diapers = { count: { type: Number }, cost: { type: Number } };
const formula = { count: { type: Number }, cost: { type: Number } };
const dashboardSchema = mongoose.Schema({
  test: { type: String },
  diapers: diapers,
  formula: formula,
});

const DashboardModel = mongoose.model("dashboard", dashboardSchema);

module.exports = { DashboardModel };
