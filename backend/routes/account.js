const pg_pool = require("../pg/pg_pool");
const jwt = require("jsonwebtoken");
const { ACTIVE, PENDING, BLOCKED } = require("../constants");
const { userStatus } = require("./userStatus");
const {sendMail} = require("../sendmail");

const generateAccessToken = (login, lifetime) => {
    return jwt.sign({ login }, process.env.DB_SECRET, {
        expiresIn: `${lifetime}s`,
    });
};
const generateEmailConfirmCode = () => {
    return Math.floor(Math.random() * 100000);
};
const confirm_code = generateEmailConfirmCode();
const confirmEmail = async (req, res) => {
    const { code, login } = req.body;
    console.log({ code, confirm_code, login });
    if (code && code == confirm_code) {
        await pg_pool.query(
            `UPDATE users SET status='ACTIVE' WHERE login='${login}'`
        );
        res.status(200).json({
            msg: "Email confirmed"
        })
    }
};
const tokenRefresh = async (req, res) => {
    const { login, JWT_LIFETIME_SECONDS } = req.body;
    console.log({ login, JWT_LIFETIME_SECONDS });
    const token = generateAccessToken(login, JWT_LIFETIME_SECONDS);
    res.json({
        msg: "Token refreshed succesful",
        token,
    });
};
const initialAuth = async (req, res) => {
    const { login } = req.body;
    const user = await pg_pool.query(
        `SELECT login, status, role FROM users WHERE login='${login}'`
    );
    console.log("GET INITIAL DATA PG", user.rows[0]);
    res.status(200).json({
        login: user.rows[0].login,
        status: user.rows[0].status,
        role: user.rows[0].role,
    });
};
const userLogin = async (req, res) => {
    const { login, password, remember, JWT_LIFETIME_SECONDS } = req.body;
    console.log({ login, password, remember, JWT_LIFETIME_SECONDS });
    const checkUser = await pg_pool.query(
        `SELECT EXISTS(SELECT login, password FROM users WHERE login='${login}' AND password='${password}')`
    );
    if (checkUser.rows[0].exists) {
        const user = await pg_pool.query(
            `SELECT login, role FROM users WHERE login='${login}'`
        );
        const status = await userStatus(login);
        console.log(`STATUS OF USER "${login}": ${status}`);
        if (status) {
            const token = generateAccessToken(login, JWT_LIFETIME_SECONDS);
            switch (status) {
                case ACTIVE:
                    return res.status(200).json({
                        status,
                        msg: "loginned success",
                        db: user.rows[0],
                        token,
                    });
                case PENDING:
                    return res.status(403).json({
                        status,
                        msg: "please, verify your email",
                        db: user.rows[0],
                        token,
                    });
                case BLOCKED:
                    return res.status(405).json({
                        status,
                        msg: "your accaund was blocked, connect with administration to get info",
                        db: user.rows[0],
                    });
                default:
                    return res.json({ msg: "Undefined ERROR" });
            }
        } else {
            return res.status(400).json({ msg: "unknown error" });
        }
    } else {
        res.status(400).json({ msg: "incorrect login or password" });
        console.log("AUTH ERR");
    }
};
const userRegister = async (req, res) => {
    const { login, password, remember, role } = req.body;
    console.log({ login, password, remember, role });
    const check = await pg_pool.query(
        `SELECT EXISTS(SELECT login FROM users WHERE login='${login}')`
    );
    if (check.rows[0].exists) {
        return res.json({ msg: `user ${login} already exists` });
    } else {
        const status = PENDING;
        const newUser = await pg_pool.query(
            "INSERT INTO users (login, status, password, role) values ($1, $2, $3, $4) RETURNING login, role",
            [login, status, password, role]
        );
        sendMail(login, "yurcik45mail@gmail.com", confirm_code)
        res.json(newUser.rows[0]);
        console.log("info :", newUser.rows[0]);
    }
};

module.exports = {
    userLogin,
    confirmEmail,
    initialAuth,
    userRegister,
    tokenRefresh,
};
