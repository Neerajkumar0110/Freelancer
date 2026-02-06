const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get(
  "/my-proposals",
  authMiddleware,
  roleMiddleware(["client"]),
  (req, res) => {
    res.json({
      message: "Client proposals fetched ✅",
      user: req.user,
    });
  }
);

module.exports = router;
