import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Unauthenticated User" });
  }
  const token = authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.JWT_KEY, function (err, data) {
    if (err) {
      return res.status(400).json({ message: "token invalid" });
    }
    req.userId = data.userId;
    next();
  });
}

export default authenticateUser;
