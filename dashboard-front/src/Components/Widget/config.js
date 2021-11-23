import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';

import Reddit from "./Reddit/Reddit";
import SearchChampion from "./LeagueOfLegend/SearchChampion/SearchChampion";

export const REDDIT = 10
export const REDDIT_POSTS = 11
export const REDDIT_SEARCH = 12
export const REDDIT_PROFILE = 13

export const LEAGUE_OF_LEGEND = 20
export const LEAGUE_OF_LEGEND_SEARCH_CHAMPION = 21

let widgetConfig = [
    {
        id: REDDIT_POSTS,
        label: 'Reddit Posts',
        logoService: 'Images/LogoApi/reddit.png',
        icon: <ImageIcon/>,
        size: {w: 5, h: 10, x: 0, y: Infinity},
        component: <Reddit widget={REDDIT_POSTS}/>,
    },
    {
        id: REDDIT_SEARCH,
        label: 'Reddit Search',
        logoService: 'Images/LogoApi/reddit.png',
        icon: <SearchIcon/>,
        size: {w: 4, h: 6, x: 0, y: Infinity},
        component: <Reddit widget={REDDIT_SEARCH}/>,
    },
    {
        id: REDDIT_PROFILE,
        label: 'Reddit Profile',
        logoService: 'Images/LogoApi/reddit.png',
        icon: <PersonIcon/>,
        size: {w: 3, h: 3, x: 0, y: Infinity},
        component: <Reddit widget={REDDIT_PROFILE}/>,
    },
    {
        id: LEAGUE_OF_LEGEND_SEARCH_CHAMPION,
        label: 'Search champion',
        logoService: 'Images/LogoApi/league_of_legends.png',
        icon: <SearchIcon/>,
        size: {w: 6, h: 5, x: 0, y: Infinity},
        component: <SearchChampion/>,
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
    },
    {
        id: LEAGUE_OF_LEGEND,
        label: 'League of legend',
        logoService: 'Images/LogoApi/league_of_legends.png',
        widget: [
            widgetConfig.find(elem => elem.id === LEAGUE_OF_LEGEND_SEARCH_CHAMPION),
        ]
    }
]


export default serviceConfig;