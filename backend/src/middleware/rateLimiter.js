const rateLimit = require("express-rate-limit");

/* =======================
   LOGIN LIMIT
======================= */
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* =======================
   FORGOT PASSWORD LIMIT
======================= */
exports.forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    message: "Too many password reset requests. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* =======================
   VERIFY OTP LIMIT
======================= */
exports.verifyOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many OTP attempts. Please wait before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* =======================
   RESEND OTP LIMIT
======================= */
exports.resendOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    message: "Too many OTP resend requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
