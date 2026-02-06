const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");

/* =======================
   SIGNUP
======================= */
exports.signup = async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, async (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      { full_name, email, password: hashedPassword, role },
      (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        res.status(201).json({ message: "Signup successful 🎉" });
      }
    );
  });
};

/* =======================
   LOGIN
======================= */
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  User.findByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

/* =======================
   FORGOT PASSWORD
======================= */
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  User.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    User.saveResetToken(email, resetToken, expiry, (err) => {
      if (err) return res.status(500).json({ message: err.message });

      // TEMP: log reset link
      console.log(
        `🔑 Reset Link: http://localhost:3000/reset-password?token=${resetToken}`
      );

      res.json({
        message: "Password reset link sent (check backend console)",
      });
    });
  });
};

/* =======================
   RESET PASSWORD
======================= */
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password required" });
  }

  User.findByResetToken(token, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = result[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    User.updatePassword(user.id, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Password reset successful ✅" });
    });
  });
};
