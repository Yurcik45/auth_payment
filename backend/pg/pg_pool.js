const Pool = require("pg").Pool;
const pool = new Pool({
    user: "yurcik",
    password: "0000",
    host: "localhost",
    port: 5432,
    database: "payment_app",
});

module.exports = pool;
