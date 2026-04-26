const { User } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
      msg: "Profile fetched successfully"
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};