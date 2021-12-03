const database = require("../../../config/Database");
const token = require("../../../config/Token");
const bcrypt = require("bcrypt");

function getUser(body) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT * FROM User WHERE username=?;`

            let data = await database.request(sqlRequest, [body.username]);
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

function getUserGoogle(body) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT * FROM User WHERE email=? AND auth='google';`

            let data = await database.request(sqlRequest, [body.email]);
            if (undefined !== data && data.length > 0) {
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

function hashCheck(body, hash) {
    return new Promise(async (resolve, reject) => {
        try {
            bcrypt.compare(body.password, hash, function (err, res) {
                resolve(res);
            });
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

module.exports = async function (req, res) {
    let user;

    if (req.body.auth === 'google')
        user = await getUserGoogle(req.body);
    else
        user = await getUser(req.body);

    if (user.error) {
        res.send({
            error: user.error
        }).status(200);
    } else if (req.body.auth !== 'google') {
        let checkPassword = await hashCheck(req.body, user.password);

        if (checkPassword) {
            res.json({
                access_token: token.generateToken(user.username, user.user_id),
                duration: '3 hours',
            }).status(200)
        } else {
            res.send({
                error: 'wrong password',
            }).status(200);
        }
    } else {
        res.json({
            access_token: token.generateToken(user.username, user.user_id),
            duration: '3 hours',
        }).status(200)
    }
}