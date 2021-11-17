module.exports = function (req, res) {
    res.send({
        clientId: 'SjUvT9xx-DqV9ig65JTCmA',
        clientSecret: 'ra2dL8KdqufMIiPXfRnMnHeVk0NJCw',
        redirectUri: 'http://localhost:3000/redditApi',
        //redirectUri: 'https://google.com',
    }).status(200);
}