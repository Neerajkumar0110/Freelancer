const db = require("../config/db");

exports.findByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

exports.createUser = (user, callback) => {
  db.query(
    "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.full_name, user.email, user.password, user.role],
    callback
  );
};

exports.saveResetToken = (email, token, expiry, callback) => {
  db.query(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
    [token, expiry, email],
    callback
  );
};

exports.findByResetToken = (token, callback) => {
  db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
    [token],
    callback
  );
};

exports.updatePassword = (id, password, callback) => {
  db.query(
    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
    [password, id],
    callback
  );
};
