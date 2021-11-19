export const REDDIT_POSTS = 1
export const REDDIT_SEARCH = 2
export const REDDIT_PROFILE = 3

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

export default widgetConfig;