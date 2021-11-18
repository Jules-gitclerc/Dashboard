import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';

let pagesConfig = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <DashboardIcon/>,
        redirect: '/',
    },
    {
        id: 2,
        name: 'Profile',
        icon: <PersonIcon/>,
        redirect: 'Profile',
    },
]

export default pagesConfig;