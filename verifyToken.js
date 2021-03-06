const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || require("./utils").secret;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.user = {
          username: decoded.username,
        };
        next();
      }
    });
  }
};

module.exports = verifyToken;
