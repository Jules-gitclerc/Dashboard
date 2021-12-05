const moment = require('moment');

module.exports = function(req, res) {
    res.json({
        client: {
            host: req.connection.remoteAddress.replace(/^.*:/, '')
        },
        server: {
            current_time: moment().unix(),
            services: [
                {
                    name: 'Reddit',
                    widgets: [
                        {
                            name: 'Reddit Posts',
                            description: 'Display all posts from your reddit account and you can filter by tendances',
                            params: [
                                {
                                    name: 'username reddit',
                                    type: 'string'
                                },
                                {
                                    name: 'password reddit',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'Reddit Search',
                            description: 'Search your subreddit and you can subscribe to',
                            params: [
                                {
                                    name: 'username reddit',
                                    type: 'string'
                                },
                                {
                                    name: 'password reddit',
                                    type: 'string'
                                },
                                {
                                    name: 'search',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'League of legend',
                    widgets: [
                        {
                            name: 'Search champion',
                            description: 'You can search a champion, for seen description, spell and satistique',
                            params: [
                                {
                                    name: 'champion search',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'Inventory',
                            description: 'You can search a item, and create a set of item and link a champion for create your build for your game',
                            params: [
                                {
                                    name: 'champion search',
                                    type: 'string'
                                },
                                {
                                    name: 'tags',
                                    type: 'string'
                                },
                                {
                                    name: 'search item',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'Weather',
                    widgets: [
                        {
                            name: 'Search Weather',
                            description: 'You can find a weather of any country and any city',
                            params: [
                                {
                                    name: 'country search',
                                    type: 'string'
                                },
                                {
                                    name: 'city search',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'Crypto',
                    widgets: [
                        {
                            name: 'Search by date',
                            description: 'You can find a current price of country by date and crypto-currency',
                            params: [
                                {
                                    name: 'crypto-currency search',
                                    type: 'string'
                                },
                                {
                                    name: 'date',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                }
            ]
        },
    })
}