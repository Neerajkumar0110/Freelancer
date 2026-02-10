const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const {
  loginLimiter,
  forgotPasswordLimiter,
  verifyOtpLimiter,
  resendOtpLimiter,
} = require("../middleware/rateLimiter");

router.post("/signup", authController.signup);

// 🔒 Protected routes
router.post("/login", loginLimiter, authController.login);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword
);
router.post("/verify-otp", verifyOtpLimiter, authController.verifyOtp);
router.post("/resend-otp", resendOtpLimiter, authController.resendOtp);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
