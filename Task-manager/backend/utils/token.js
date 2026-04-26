const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // token expires in 1 day
  });
};

module.exports = {
  createAccessToken,
};