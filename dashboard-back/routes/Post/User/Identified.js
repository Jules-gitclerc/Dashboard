const database = require('../../../config/Database');

function setIdentifier(body) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `UPDATE User SET is_identified=true WHERE user_id=?;`
            await database.request(sqlRequest, [body.user_id]);
            resolve();
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function(req, res) {
    await setIdentifier(req.body);
    res.send({
        message: 'OK',
    }).status(200);
}