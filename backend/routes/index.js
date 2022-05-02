const express = require("express");
const { loginUser, register, checkLogin } = require("./account");
const { testDashboardAccess } = require("./dashboard");
const {authenticateToken} = require("./tokenConfirm");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);
router.post("/check_login", checkLogin);

router.get("/dashboard", authenticateToken, testDashboardAccess);

module.exports = router;
