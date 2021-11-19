export const REDDIT = 10
export const REDDIT_POSTS = 11
export const REDDIT_SEARCH = 12
export const REDDIT_PROFILE = 13

let widgetConfig = [
    {
        id: REDDIT_POSTS,
        label: 'Reddit Posts',
        logoService: 'Images/LogoApi/reddit.png',
        size: {w: 10, h: 10, x: 0, y: Infinity},
        component: <div>reddit_posts</div>,
    },
    {
        id: REDDIT_SEARCH,
        label: 'Reddit Search',
        logoService: 'Images/LogoApi/reddit.png',
        size: {w: 6, h: 2, x: 0, y: Infinity},
        component: <div>reddit_search</div>,
    },
    {
        id: REDDIT_PROFILE,
        label: 'Reddit Profile',
        logoService: 'Images/LogoApi/reddit.png',
        size: {w: 3, h: 3, x: 0, y: Infinity},
        component: <div>reddit_profile</div>,
    }
]


let serviceConfig = [
    {
        id: REDDIT,
        label: 'Reddit',
        logo: 'Images/LogoApi/reddit.png',
        widget: [
            widgetConfig.find(elem => elem.id === REDDIT_POSTS),
            widgetConfig.find(elem => elem.id === REDDIT_SEARCH),
            widgetConfig.find(elem => elem.id === REDDIT_PROFILE),
        ]
    }
]


export default serviceConfig;