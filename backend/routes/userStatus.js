const { ACTIVE, PENDING, BLOCKED } = require("../constants");
const pg_pool = require("../pg/pg_pool");

const userStatus = async (login) => {
    const status = await pg_pool.query(
        `SELECT status FROM users WHERE login='${login}'`
    );
    return status.rows[0].status;
};

module.exports = {
    userStatus,
};
