const database = require('../../../config/Database');
const token = require("../../../config/Token");

function getUserById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT * FROM User WHERE user_id='${id}';`
            let data = await database.request(sqlRequest);
            if (data.length > 0) {
                resolve(data[0]);
            } else {
                resolve({
                    error: 'user is not here',
                })
            }
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

function getServicesById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT id_service FROM LinkUserServices WHERE id_user = ${id};`
            let data = await database.request(sqlRequest);
            if (data.length > 0) {
                resolve(data);
            } else {
                resolve({
                    error: 'user is not here',
                })
            }
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function(req, res) {
    let dataToken = token.getTokenData(req);
    let data = await getUserById(dataToken.id_user);
    let service = await getServicesById(dataToken.id_user)

    res.send({
        username: data.username,
        name: `${data.first_name} ${data.last_name}`,
        phone: data.phone,
        email: data.email,
        isIdentified: data.is_identified,
        avatar: data.avatar,
        services: (!service.error ? service : []),
        firstName: data.first_name,
        lastName: data.last_name,
    }).status(200);
}