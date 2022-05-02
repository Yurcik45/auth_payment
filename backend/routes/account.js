const pg_pool = require("../pg/pg_pool");
const jwt = require("jsonwebtoken");

const generateAccessToken = (login, lifetime) => {
    return jwt.sign({ login }, process.env.DB_SECRET, {
        expiresIn: `${lifetime}s`,
    });
};
const loginUser = async (req, res) => {
    const { login, password, remember, JWT_LIFETIME_SECONDS } = req.body;
    console.log({ login, password, remember, JWT_LIFETIME_SECONDS });
    const checkUser = await pg_pool.query(
        `SELECT EXISTS(SELECT login, password FROM users WHERE login='${login}' AND password='${password}')`
    );
    if (checkUser.rows[0].exists) {
        const token = generateAccessToken(login, JWT_LIFETIME_SECONDS);
        const user = await pg_pool.query(
            `SELECT login, role FROM users WHERE login='${login}'`
        );
        res.json({ db: user.rows[0], token });
        console.log("AUTH OK", user.rows[0]);
    } else {
        res.json({ msg: "incorrect login or password" });
        console.log("AUTH ERR");
    }
};
const register = async (req, res) => {
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
};
const checkLogin = async (req, res) => {
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
};

module.exports = {
    loginUser,
    register,
    checkLogin,
};
