import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import InventoryIcon from '@mui/icons-material/Inventory';

import Reddit from "./Reddit/Reddit";
import SearchChampion from "./LeagueOfLegend/SearchChampion/SearchChampion";
import Weather from "./Weather/Weather";
import CryptoSearchData from "./Crypto/CryptoSearchByDate";
import ItemModule from "./LeagueOfLegend/ItemModule/ItemModule";

export const REDDIT = 10
export const REDDIT_POSTS = 11
export const REDDIT_SEARCH = 12

export const LEAGUE_OF_LEGEND = 20
export const LEAGUE_OF_LEGEND_SEARCH_CHAMPION = 21
export const LEAGUE_OF_LEGEND_SEARCH_ITEM = 22

export const WEATHER = 30
export const WEATHER_SEARCH = 31

export const CRYTPO = 40
export const CRYPTO_SEARCH_BY_DATE = 41

export const widgetConfig = [
    {
        id: REDDIT_POSTS,
        label: 'Reddit Posts',
        logoService: 'Images/LogoApi/reddit.png',
        icon: <ImageIcon/>,
        size: {w: 6, h: 10, x: 0, y: Infinity},
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
        id: LEAGUE_OF_LEGEND_SEARCH_CHAMPION,
        label: 'Search champion',
        logoService: 'Images/LogoApi/league_of_legends.png',
        icon: <SearchIcon/>,
        size: {w: 7, h: 7, x: 0, y: Infinity},
        component: <SearchChampion/>,
    },
    {
        id: WEATHER_SEARCH,
        label: 'Search Weather',
        logoService: 'Images/LogoApi/weather.png',
        icon: <SearchIcon/>,
        size: {w: 5, h: 5, x: 0, y: Infinity},
        component: <Weather/>,
    },
    {
        id: LEAGUE_OF_LEGEND_SEARCH_ITEM,
        label: 'Inventory',
        logoService: 'Images/LogoApi/league_of_legends.png',
        icon: <InventoryIcon/>,
        size: {w: 7, h: 6, x: 0, y: Infinity},
        component: <ItemModule/>,
    },
    {
        id: CRYPTO_SEARCH_BY_DATE,
        label: 'Search by date',
        logoService: 'Images/LogoApi/coingeko.png',
        icon: <SearchIcon/>,
        size: {w: 4, h: 5, x: 0, y: Infinity},
        component: <CryptoSearchData/>,
    }
]


const serviceConfig = [
    {
        id: REDDIT,
        label: 'Reddit',
        logoService: 'Images/LogoApi/reddit.png',
        widget: [
            widgetConfig.find(elem => elem.id === REDDIT_POSTS),
            widgetConfig.find(elem => elem.id === REDDIT_SEARCH),
        ]
    },
    {
        id: LEAGUE_OF_LEGEND,
        label: 'League of legend',
        logoService: 'Images/LogoApi/league_of_legends.png',
        widget: [
            widgetConfig.find(elem => elem.id === LEAGUE_OF_LEGEND_SEARCH_CHAMPION),
            widgetConfig.find(elem => elem.id === LEAGUE_OF_LEGEND_SEARCH_ITEM),
        ]
    },
    {
        id: WEATHER,
        label: 'Weather',
        logoService: 'Images/LogoApi/weather.png',
        widget: [
            widgetConfig.find(elem => elem.id === WEATHER_SEARCH),
        ]
    },
    {
        id: CRYTPO,
        label: 'Crypto',
        logoService: 'Images/LogoApi/coingeko.png',
        widget: [
            widgetConfig.find(elem => elem.id === CRYPTO_SEARCH_BY_DATE),
        ]
    }
]

export default serviceConfig;