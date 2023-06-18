const CheckRoles = (roles, allowed = true) => {
  return (req, res, next) => {
    console.log(`${roles} ${allowed ? "" : "not "} allowed`);
    console.log("Initated by", res.locals?.initiatedUser);
    if (roles.includes(res.locals.initiatedUser.role) === -1) {
      console.log("ROLE CHECK FAILED");
      return res.status(403).send({
        message: "action not allowed for role",
      });
    } else {
      console.log("ROLE CHECK COMPLETE. PROCEEDING");
      next();
    }
  };
};

module.exports = { CheckRoles };
