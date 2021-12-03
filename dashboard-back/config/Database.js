const mariadb = require('mariadb');

const pool = mariadb.createPool({
    connectionLimit: 5,
    user: 'admin',
    password: 'admin',
    host: 'localhost',
    database: 'dashboard',
    port: '3306'
});

async function request(sql, tab) {
    let conn;
    let res;

    try {
        conn = await pool.getConnection();
        res = await conn.query(sql, tab);
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
