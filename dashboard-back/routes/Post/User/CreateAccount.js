const bcrypt = require('bcrypt');
const database = require('../../../config/Database');
const token = require('../../../config/Token');
const nodemailer = require('nodemailer');
const {networkInterfaces} = require("os");

function createNewAccount(body) {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(body.password, 10, async (err, hash) => {
                let sqlRequest = `INSERT INTO User (username, first_name, last_name, email, password, phone, is_identified) VALUES ('${body.username}', '${body.firstName}', '${body.lastName}', '${body.mail}', '${hash}', '${body.phone}', false);`
                await database.request(sqlRequest);
                resolve();
            })
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

function getUserId(body) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT * FROM User WHERE username='${body.username}' AND email='${body.mail}' AND phone='${body.phone}';`
            let data = await database.request(sqlRequest);
            resolve(data[0].user_id);
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

function checkUsernameIsAlreadySet(body) {
    return new Promise(async (resolve, reject) => {
        try {
            let sqlRequest = `SELECT * FROM User WHERE username='${body.username}';`
            let data = await database.request(sqlRequest);
            if (data.length > 0)
                resolve(true)
            else
                resolve(false)
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

function identificationMail(mail, userId, username) {
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yodash246@gmail.com',
            pass: 'DashEpitechBoard21!'
        }
    });

    const mailOptions = {
        from: 'yodash246@gmail.com',
        to: mail,
        subject: 'Identification Mail from YODASH',
        text: `http://${results["en0"][0]}:3000/identification/${userId}/${username}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = async function (req, res) {
    let isUsernameIsSet = await checkUsernameIsAlreadySet(req.body);

    if (isUsernameIsSet) {
        res.json({
            error: 'The username already exists',
        }).status(200)
    } else {
        await createNewAccount(req.body);
        let id = await getUserId(req.body);
        identificationMail(req.body.mail, id, req.body.username);
        res.json({
            access_token: token.generateToken(req.body.username, id),
            duration: '3 hours',
        }).status(200)
    }
}