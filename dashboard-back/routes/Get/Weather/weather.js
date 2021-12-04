const axios = require("axios");

module.exports = async function (req, res) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.countryCode}&appid=0144563c0b4b1a1065fde914246dbb87&units=metric`); //todo api key get from back
        res.send(response.data).status(200);
    } catch (err) {
        res.send({
            error: err
        }).status(403);
    }
}