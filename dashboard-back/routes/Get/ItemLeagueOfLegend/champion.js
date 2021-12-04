const axios = require("axios");

module.exports = async function (req, res) {
    try {
        const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json`);

            let tab = []

            for (let obj in response.data.data) {
                tab.push(response.data.data[obj]);
            }
            res.send(tab).status(200);
    } catch (err) {
        res.send({
            error: err
        }).status(403);
    }
}