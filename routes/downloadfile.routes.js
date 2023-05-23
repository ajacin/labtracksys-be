const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.download("README.md");
});

module.exports = router;
