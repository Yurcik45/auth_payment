const { ACTIVE, PENDING, BLOCKED } = require("../constants");
const pg_pool = require("../pg/pg_pool");

const userStatus = async (login) => {
    const status = await pg_pool.query(
        `SELECT status FROM users WHERE login='${login}'`
    );
    console.log("STATUS of user : " + login, status);
    console.log("status === PENDING", status === PENDING);
};

module.exports = {
    userStatus,
};
