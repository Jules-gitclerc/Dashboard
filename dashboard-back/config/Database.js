const mariadb = require('mariadb');

const pool = mariadb.createPool({
    connectionLimit: 5,
    user: 'root',
    password: 'password',
    host: 'mariadb',
    database: 'dashboard',
    port: '3307'
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
