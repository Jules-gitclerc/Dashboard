const token = require("../../../config/Token");
const database = require("../../../config/Database");

function deleteWidgetByUser(id_widget, id_user) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `DELETE FROM Widget WHERE id_user=? AND id_widget=?;`
            await database.request(sqlRequest, [id_user, id_widget]);
            resolve();
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function(req, res) {
    let dataToken = token.getTokenData(req);

    await deleteWidgetByUser(req.params.idWidget, dataToken.id_user);
    res.send({
        message: 'OK',
    }).status(200);
}