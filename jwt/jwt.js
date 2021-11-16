const jwt = require("jsonwebtoken");

const generateToken = (uid = "") => {
  const secretKey = process.env.SECRET_KEY;
  const payload = { uid };
  return jwt.sign(payload, secretKey, {
    expiresIn: "2hr",
  });
};

module.exports = { generateToken };
