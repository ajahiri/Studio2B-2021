const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "some_secret";

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied!");

  // verify the token
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Error validating token (invalid token).");
  }
};
