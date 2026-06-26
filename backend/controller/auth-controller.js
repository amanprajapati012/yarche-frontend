require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.body.token || req.headers.authorization?.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY, (error, result) => {
    if (error) {
      return "token expire";
    }
    return result;
  });

  if (user === "token expire") {
    res.json({ message: "Token expire login again", response: "failed" });
    return;
  }
  next()
};

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("🔥 ADMIN AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET_KEY
    );

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token expired or invalid",
      error: err.message,
    });
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
