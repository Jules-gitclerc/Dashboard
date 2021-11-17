const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'dashboard',
    connectionLimit: 5
});

async function request(sql) {
    let conn;
    let res;

    try {
        conn = await pool.getConnection();
        res = await conn.query(sql);
    } catch (err) {
        throw err;
    } finally {
        if (conn)
            await conn.end();
        return res;
    }
    return res;
}

module.exports = {
    request
};
