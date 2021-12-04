const axios = require("axios");

module.exports = async function (req, res) {
    try {
        const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/item.json`);

        let parsing = [];

        for (let index in response.data.data) {
            parsing.push({
                id: index,
                name: response.data.data[index].name,
                description: response.data.data[index].plaintext,
                into: response.data.data[index].into,
                image: response.data.data[index].image,
                gold: response.data.data[index].gold,
                tags: response.data.data[index].tags,
                stats: response.data.data[index].stats,
            })
        }

        res.send(parsing).status(200);
    } catch (err) {
        res.send({
            error: err
        }).status(403);
    }
}