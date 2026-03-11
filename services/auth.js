const jwt = require("jsonwebtoken");
const secret = "your-secret-key"; // In production, use environment variables to store secrets

function setUser(user) {
  return jwt.sign(
    { id: user?._id, email: user.email, role: user.role },
    secret,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded.user;
  });
}

module.exports = {
  setUser,
  getUser,
};
