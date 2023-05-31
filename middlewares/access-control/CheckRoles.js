const CheckRoles = (roles, allowed = true) => {
  return (req, res, next) => {
    console.log(`${roles} ${allowed ? "" : "not "} allowed`);
    console.log("Initated by", res.locals?.initiatedUser);
    if (roles.includes(res.locals.initiatedUser.role) === -1) {
      res.status(403).send({
        message: "action not allowed for role",
      });
    } else {
      next();
    }
  };
};

module.exports = { CheckRoles };
