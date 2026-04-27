const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        msg: "Token not found",
      });
    }

    //  Extract token from "Bearer token"
    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({
        status: false,
        msg: "Invalid token",
      });
    }

    //  Sequelize way
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "User not found",
      });
    }

    //  Attach minimal user info
    req.user = {
      id: user.id,
      email: user.email,
    };

    next();

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};