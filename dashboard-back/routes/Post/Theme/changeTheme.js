const token = require("../../../config/Token");
const database = require("../../../config/Database");

function updateTheme(id_theme, id_user) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `UPDATE User SET id_theme=? WHERE user_id=?;`
            await database.request(sqlRequest, [id_theme, id_user]);
            resolve();
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function (req, res) {
    let dataToken = token.getTokenData(req);

    await updateTheme(req.body.idTheme, dataToken.id_user);
    res.send({
        message: 'OK'
    }).status(200);
}