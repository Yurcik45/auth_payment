const express = require("express");
const router = express.Router();
const pg_pool = require("../pg/pg_pool");

router.post("/login", async (req, res) => {
    const { login, password, remember } = req.body;
    console.log({ login, password, remember });
    const checkUser = await pg_pool.query(
        `SELECT EXISTS(SELECT login, password FROM users WHERE login='${login}' AND password='${password}')`
    );
    if (checkUser.rows[0].exists) {
        const user = await pg_pool.query(
            `SELECT login, role FROM users WHERE login='${login}'`
        );
        res.json(user.rows[0]);
        console.log("AUTH OK", user.rows[0]);
    } else {
        res.json({ msg: "incorrect login or password" });
        console.log("AUTH ERR");
    }
});
router.post("/register", async (req, res) => {
    const { login, password, remember, role } = req.body;
    console.log({ login, password, remember, role });
    const check = await pg_pool.query(
        `SELECT EXISTS(SELECT login FROM users WHERE login='${login}')`
    );
    if (check.rows[0].exists) {
        return res.json({ msg: `user ${login} already exists` });
    } else {
        const newUser = await pg_pool.query(
            "INSERT INTO users (login, password, role) values ($1, $2, $3) RETURNING login, role",
            [login, password, role]
        );
        res.json(newUser.rows[0]);
        console.log("info :", newUser.rows[0]);
    }
});
router.post("/check_login", async (req, res) => {
    const { login } = req.body;
    const check = await pg_pool.query(
        `SELECT EXISTS(SELECT login, role FROM users WHERE login='${login}')`
    );
    if (check.rows[0].exists) {
        const user = await pg_pool.query(
            `SELECT login, role FROM users WHERE login='${login}'`
        );
        res.json(user.rows[0]);
    } else {
        res.json({ msg: `user ${login} not found` });
    }
    console.log("check :", check);
});

module.exports = router;
