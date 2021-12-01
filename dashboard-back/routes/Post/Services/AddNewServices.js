const token = require("../../../config/Token");
const database = require("../../../config/Database");

function addWidgetByUser(id_widget, id_user) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `INSERT INTO Widget(id_widget, id_user) VALUES ('${id_widget}', ${id_user});`
            await database.request(sqlRequest);
            resolve();
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function (req, res) {
    let dataToken = token.getTokenData(req);

    await addWidgetByUser(req.body.idWidget, dataToken.id_user);
    res.send({
        message: 'OK',
    }).status(200);
}