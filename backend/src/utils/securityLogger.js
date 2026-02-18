const db = require("../config/db");

exports.logSecurityEvent = (email, action, req) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  const userAgent = req.headers["user-agent"] || "unknown";

  db.query(
    `INSERT INTO security_logs (email, action, ip_address, user_agent)
     VALUES (?, ?, ?, ?)`,
    [email, action, ip, userAgent],
    () => {}
  );
};
