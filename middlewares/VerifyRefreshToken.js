const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyRefreshToken = (req, res, next) => {
  const token =
    req.body.refreshToken ||
    req.query.refreshToken ||
    req.headers["x-refresh-token"];

  if (!token) {
    res.status(403).send("Refresh token missing");
  } else {
    try {
      //TODO: store refersh token in a collection to enable revoke
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      req.user = decoded;
      res.locals.user = decoded;

      next();
    } catch (error) {
      res.status(400).send("Refresh token invalid");
    }
    next();
  }
};
module.exports = VerifyRefreshToken;
