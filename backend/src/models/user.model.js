const db = require("../config/db");

/* =======================
   FIND USER
======================= */
exports.findByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

/* =======================
   CREATE USER
======================= */
exports.createUser = (user, callback) => {
  db.query(
    "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.full_name, user.email, user.password, user.role],
    callback
  );
};

/* =======================
   SAVE OTP
======================= */
exports.saveOtp = (email, otp, expiry, callback) => {
  db.query(
    `UPDATE users
     SET reset_otp = ?, reset_otp_expiry = ?, otp_attempts = 0, otp_verified = 0
     WHERE email = ?`,
    [otp, expiry, email],
    callback
  );
};

/* =======================
   FIND OTP DATA
======================= */
exports.findOtpByEmail = (email, callback) => {
  db.query(
    `SELECT reset_otp, reset_otp_expiry, otp_attempts
     FROM users WHERE email = ?`,
    [email],
    callback
  );
};

/* =======================
   OTP ATTEMPT INCREMENT
======================= */
exports.incrementOtpAttempts = (email) => {
  db.query(
    "UPDATE users SET otp_attempts = otp_attempts + 1 WHERE email = ?",
    [email]
  );
};

/* =======================
   MARK OTP VERIFIED
======================= */
exports.markOtpVerified = (email, callback) => {
  db.query(
    "UPDATE users SET otp_verified = 1 WHERE email = ?",
    [email],
    callback
  );
};

/* =======================
   CHECK OTP VERIFIED USER
======================= */
exports.findOtpVerifiedUser = (email, callback) => {
  db.query(
    "SELECT id FROM users WHERE email = ? AND otp_verified = 1",
    [email],
    callback
  );
};

/* =======================
   UPDATE PASSWORD
======================= */
exports.updatePassword = (email, password, callback) => {
  db.query(
    `UPDATE users
     SET password = ?,
         reset_otp = NULL,
         reset_otp_expiry = NULL,
         otp_attempts = 0,
         otp_verified = 0
     WHERE email = ?`,
    [password, email],
    callback
  );
};
exports.saveOtpWithResend = (email, otp, expiry, sentAt, callback) => {
  db.query(
    `UPDATE users
     SET reset_otp=?,
         reset_otp_expiry=?,
         otp_attempts=0,
         otp_verified=0,
         otp_last_sent_at=?
     WHERE email=?`,
    [otp, expiry, sentAt, email],
    callback
  );
};
exports.updateOtpResendCount = (email, callback) => {
  db.query(
    `
    UPDATE users
    SET
      otp_resend_count =
        CASE
          WHEN otp_resend_date = CURDATE()
          THEN otp_resend_count + 1
          ELSE 1
        END,
      otp_resend_date = CURDATE()
    WHERE email = ?
    `,
    [email],
    callback
  );
};
