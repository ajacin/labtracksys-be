const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.mongoUrlActivityLog, {
  useNewUrlParser: true,
});

module.exports = { connection };
