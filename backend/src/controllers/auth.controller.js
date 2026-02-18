const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { sendOtpEmail } = require("../utils/email");
const { isStrongPassword } = require("../utils/passwordValidator");
const { logSecurityEvent } = require("../utils/securityLogger");

/* =======================
   SIGNUP
======================= */
exports.signup = async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const passwordError = isStrongPassword(password);
  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  User.findByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      { full_name, email, password: hashedPassword, role },
      (err) => {
        if (err) return res.status(500).json({ message: err.message });

        logSecurityEvent(email, "SIGNUP", req);
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
      logSecurityEvent(email, "LOGIN_FAILED", req);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logSecurityEvent(email, "LOGIN_FAILED", req);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    logSecurityEvent(email, "LOGIN_SUCCESS", req);

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
   FORGOT PASSWORD (EMAIL OTP)
======================= */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  User.findByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.json({ message: "If email exists, OTP sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    User.saveOtp(email, hashedOtp, expiry, async (err) => {
      if (err) return res.status(500).json({ message: err.message });

      await sendOtpEmail(email, otp);
      logSecurityEvent(email, "OTP_SENT", req);

      res.json({ message: "If email exists, OTP sent" });
    });
  });
};

/* =======================
   VERIFY OTP
======================= */
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email & OTP required" });
  }

  User.findOtpByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      logSecurityEvent(email, "OTP_VERIFY_FAILED", req);
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = result[0];

    if (!user.reset_otp || new Date(user.reset_otp_expiry) < new Date()) {
      logSecurityEvent(email, "OTP_EXPIRED", req);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp_attempts >= 5) {
      logSecurityEvent(email, "OTP_ATTEMPTS_EXCEEDED", req);
      return res.status(429).json({ message: "Too many attempts" });
    }

    const isValid = await bcrypt.compare(otp, user.reset_otp);
    if (!isValid) {
      User.incrementOtpAttempts(email);
      logSecurityEvent(email, "OTP_VERIFY_FAILED", req);
      return res.status(400).json({ message: "Invalid OTP" });
    }

    User.markOtpVerified(email, (err) => {
      if (err) return res.status(500).json({ message: err.message });

      logSecurityEvent(email, "OTP_VERIFY_SUCCESS", req);
      res.json({ message: "OTP verified successfully" });
    });
  });
};

/* =======================
   RESET PASSWORD
======================= */
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email & new password required" });
  }

  const passwordError = isStrongPassword(newPassword);
  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  User.findOtpVerifiedUser(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(403).json({ message: "OTP not verified" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    User.updatePassword(email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: err.message });

      logSecurityEvent(email, "PASSWORD_RESET", req);
      res.json({ message: "Password reset successful ✅" });
    });
  });
};

/* =======================
   RESEND OTP (EMAIL + COOLDOWN + DAILY LIMIT)
======================= */
exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  User.findByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.json({ message: "If email exists, OTP sent" });
    }

    const user = result[0];

    // ⛔ DAILY LIMIT (5)
    if (
      user.otp_resend_date &&
      new Date(user.otp_resend_date).toDateString() ===
        new Date().toDateString() &&
      user.otp_resend_count >= 5
    ) {
      logSecurityEvent(email, "OTP_RESEND_LIMIT_REACHED", req);
      return res.status(429).json({
        message: "Daily OTP resend limit reached. Try again tomorrow.",
      });
    }

    // ⏳ 60s COOLDOWN
    if (user.otp_last_sent_at) {
      const diff =
        (Date.now() - new Date(user.otp_last_sent_at).getTime()) / 1000;

      if (diff < 60) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(
            60 - diff
          )} seconds before resending OTP`,
        });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    User.saveOtpWithResend(
      email,
      hashedOtp,
      expiry,
      new Date(),
      async (err) => {
        if (err) return res.status(500).json({ message: err.message });

        User.updateOtpResendCount(email, () => {});
        await sendOtpEmail(email, otp);

        logSecurityEvent(email, "OTP_RESENT", req);
        res.json({ message: "OTP resent successfully" });
      }
    );
  });
};
