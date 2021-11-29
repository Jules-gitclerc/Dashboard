const database = require("../../../config/Database");
const token = require("../../../config/Token");

function deleteServicesByUser(idUser) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `DELETE FROM LinkUserServices WHERE id_user=${idUser};`
            await database.request(sqlRequest);
            resolve(true)
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

function servicesInsert(body, id_user) {
    return new Promise(async (resolve, reject) => {
        try {
            let insertTab = []

            body.forEach((elem) => {
                if (elem.checked)
                    insertTab.push(`(${elem.id}, ${id_user})`)
            })

            if (insertTab.length == 0) {
                resolve();
            } else {
                let sqlRequest = `INSERT INTO LinkUserServices (id_service, id_user) VALUES `//('${body.username}', '${body.firstName}', '${body.lastName}', '${body.mail}', '${hash}', '${body.phone}', false, '${body.avatar}', '${body.auth}');

                insertTab.forEach((elem, index) => {
                    sqlRequest += elem
                    if (index + 1 != insertTab.length)
                        sqlRequest += ", "
                    else
                        sqlRequest += ";"
                })
                await database.request(sqlRequest);
                resolve();
            }
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}


module.exports = async function (req, res) {
    let dataToken = token.getTokenData(req);
    await deleteServicesByUser(dataToken.id_user);
    await servicesInsert(req.body, dataToken.id_user);

    res.send({
        message: 'sheeeeesh',
    }).status(200);
}