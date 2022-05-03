const express = require("express");
const {
    userLogin,
    userRegister,
    tokenRefresh,
    initialAuth,
    confirmEmail,
} = require("./account");
const { testDashboardAccess } = require("./dashboard");
const { authenticateToken } = require("./tokenConfirm");
const router = express.Router();

router.post("/login", userLogin);
router.post("/auth/confirm", confirmEmail);
router.post("/initialAuth", authenticateToken, initialAuth);
router.post("/register", userRegister);
router.post("/login/refresh_token", authenticateToken, tokenRefresh);
router.get("/dashboard", authenticateToken, testDashboardAccess);

module.exports = router;
