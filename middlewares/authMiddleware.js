const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "Lasting-Dynamics";

function generateJWT(username, userType) {
  const expirationTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

  const payload = {
    username: username,
    userType: userType,
    exp: expirationTime,
  };

  return jwt.sign(payload, jwtSecret, { algorithm: "HS256" });
}

function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: "Missing authorization token" });
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { userType } = decodedToken;
      if (!allowedRoles.includes(userType)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      req.user = {
        username: decodedToken.username,
        userType: decodedToken.userType,
      };
      next();
    });
  };
}

function extractTokenFromHeader(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

module.exports = {
  generateJWT,
  authMiddleware,
};
