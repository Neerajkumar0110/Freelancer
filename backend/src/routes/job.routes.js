const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["freelancer"]),
  (req, res) => {
    res.json({
      message: "Job created by freelancer ✅",
      user: req.user,
    });
  }
);

module.exports = router;
