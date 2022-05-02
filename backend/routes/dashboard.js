const pg_pool = require('../pg/pg_pool');
const jwt = require('jsonwebtoken');

const testDashboardAccess = (req, res) => {
    console.log('dashboard', req.headers)
}

module.exports = {
    testDashboardAccess,
}
