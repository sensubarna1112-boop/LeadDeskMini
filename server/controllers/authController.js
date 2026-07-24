const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let admin = await Admin.findOne({ username });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      admin = await Admin.create({
        username: "admin",
        password: hashedPassword,
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      "SECRET123",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
};