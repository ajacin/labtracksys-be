const { TestModel } = require("../models/TestModel");
const ValidateTestIds = async (req, res, next) => {
  const testIdsfromReq = req.body.testIds || [];
  const testIds = [...new Set(testIdsfromReq)];
  let testsInDB = await TestModel.find({});
  if (testsInDB.length > 0) {
    let testIdsInDB = testsInDB.map((test) => test.id);
    console.log("TEST IDS IN request");
    console.log(testIds);
    console.log("TEST IDS IN DB");
    console.log(testIdsInDB);
    let valid = true;
    let testIdElementForError = "";
    await testIds.forEach((element) => {
      if (!testIdsInDB.includes(element)) {
        valid = false;
        testIdElementForError = element;
      }
    });
    console.log(valid ? "VALID TEST IDS" : "INVALID TEST IDS");
    if (valid) {
      console.log("test ids present");
      next();
    } else {
      return res.status(400).send({
        message: `Test listed (${testIdElementForError}) is not present in List of tests`,
      });
    }
  }
};

module.exports = { ValidateTestIds };
