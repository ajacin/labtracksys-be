const CheckRoles = (roles, allowed = true) => {
  return (req, res, next) => {
    console.log(`${roles} ${allowed ? "" : "not "} allowed`);
    console.log("Initated by", res.locals?.initiatedUser);
    console.log("Initated by role", res.locals?.initiatedUser?.role);
    console.log(roles.includes(res.locals.initiatedUser.role));
    if (!roles.includes(res.locals.initiatedUser.role)) {
      console.log("ROLE CHECK FAILED");
      return res.status(403).send({
        message:
          "action not allowed for role " + res.locals?.initiatedUser?.role,
      });
      // return res.send(403, "action not allowed for role");
    } else {
      console.log("ROLE CHECK COMPLETE. PROCEEDING");
      next();
    }
  };
};

module.exports = { CheckRoles };

//  NOTE : SetUser to be called before calling this middleware.
// Check the possibility of combining these two
