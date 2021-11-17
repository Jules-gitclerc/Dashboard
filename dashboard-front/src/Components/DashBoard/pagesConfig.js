import AllInboxIcon from '@mui/icons-material/AllInbox';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

let pagesConfig = [
    {
        id: 1,
        name: 'Reddit',
        logo: 'Images/LogoApi/reddit.png',
        redirect: '/Reddit',
        widget: [
            {
                id: 0,
                name: 'Posts',
                icon: <AllInboxIcon/>,
                redirect: '/Reddit/Posts',
            },
            {
                id: 1,
                name: 'Search Subreddit',
                icon: <SearchIcon/>,
                redirect: '/Reddit/Search',
            },
            {
                id: 2,
                name: 'Profile',
                icon: <PersonIcon/>,
                redirect: '/Reddit/Profile',
            }
        ]
    },
    {
        id: 2,
        name: 'League of legends',
        logo: 'Images/LogoApi/league_of_legends.png',
        redirect: '/LeagueOfLegends',
        widget: [
            {
                id: 0,
                name: 'Posts',
                icon: <AllInboxIcon/>,
                redirect: '/Reddit/Posts',
            },
            {
                id: 1,
                name: 'Search Subreddit',
                icon: <SearchIcon/>,
                redirect: '/Reddit/Search',
            },
            {
                id: 2,
                name: 'Profile',
                icon: <PersonIcon/>,
                redirect: '/Reddit/Profile',
            }
        ]
    }
]

export default pagesConfig;