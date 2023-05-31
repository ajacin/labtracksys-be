const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyToken = (req, res, next) => {
  console.log("In verify token");
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(403).send("No access token provided");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      req.user = decoded;
    } catch (error) {
      console.log("in token error");
      console.log(error);
      if (error instanceof jwt.TokenExpiredError) {
        res.status(403).send("Token expired");
      } else res.status(400).send("Token invalid");
    }
    next();
  }
};
module.exports = VerifyToken;
