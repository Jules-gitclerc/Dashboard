const jwt = require('jsonwebtoken');
const secretKey = 'qr78uRm`h@TLH.GW|[OT88SYMzaV+Qn[dzL6zJ)[cw*2A}EZM56?tKRwQ-bQ_Ab'

function generateToken(username, id_user) {
    return jwt.sign({username: username, id_user: id_user}, secretKey, { expiresIn: '3 hours' });
}

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}


function getTokenData(req) {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    try {
        let response = jwt.verify(token, secretKey);
        return (response)
    } catch (e) {
        console.log("ERROR => ", e)
        return null;
    }
}


function checkTokenMiddleware(req, res, next) {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

module.exports = {
    generateToken,
    checkTokenMiddleware,
    getTokenData,
}