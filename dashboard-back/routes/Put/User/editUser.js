const database = require("../../../config/Database");
const token = require("../../../config/Token");

function updateUser(body, idUser) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `UPDATE User SET username='${body.username}', first_name='${body.firstName}', last_name='${body.lastName}', email='${body.email}', phone='${body.phone}' WHERE user_id=${idUser};`
            await database.request(sqlRequest);
            resolve(true)
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function (req, res) {
    let dataToken = token.getTokenData(req);
    await updateUser(req.body, dataToken.id_user);
    res.status(200).send({
        error: 'Le voix de dieu a parler'
    });
}