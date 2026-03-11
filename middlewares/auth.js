const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookie?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
};

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.headers["Authorization"];

  if (!userUid) return res.redirect("/login");
  const token = userUid?.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.headers["Authorization"];
  console.log("User UID from header:", userUid);
  const token = userUid?.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  next();
}

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.redirect("/login")
      // .json({
      //   message:
      //     "Forbidden: You don't have permission to access this resource.",
      // });
    }
    next();
  };
};

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
};
