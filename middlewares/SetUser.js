const jwt_decode = require("jwt-decode");
const { UserModel } = require("../models/UserModel");
// SetUser middleware is called after VerifyToken. If the token is verified, SetUser will query the UserModel and will set
// user's informtion (user who initiated the request, obtained from token) to res.locals.initiatedUser
const SetUser = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token || token === "") {
    res.send({
      message: "no or invalid token",
    });
    return;
  }

  //decode token
  var decoded = jwt_decode(token);
  console.log("token decoded");
  let user = await UserModel.findOne({ username: decoded.username });
  console.log("got response here", user);
  if (user) {
    console.log("user exists from user:");
    res.locals.initiatedUser = user;
    next();
  } else {
    res.send({
      message: "User who initiated the request does not exists",
    });
    return;
  }
};

module.exports = { SetUser };
