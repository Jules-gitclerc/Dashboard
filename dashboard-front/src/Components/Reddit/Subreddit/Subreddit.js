import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import {
    Avatar,
    CircularProgress,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    List,
    Paper,
    Typography, Divider, ListItemIcon, Chip
} from "@mui/material";
import axios from "axios";
import AlertError from "../../Tools/AlertError";
import {LoadingButton} from "@mui/lab";
import PersonIcon from '@mui/icons-material/Person';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";


let dataSearch = [
    {
        label: 'Hot',
        value: '/hot',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Best',
        value: '/best',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Rising',
        value: '/rising',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Top',
        value: '/top',
        icon: <LocalFireDepartmentIcon/>
    },
]


export default function Subreddit() {
    let {subreddit} = useParams();
    const [filter, setFilter] = useState(dataSearch[0].value);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isSubscriber, setIsSubscriber] = useState(false);
    const [isLoadingSub, setIsLoadingSub] = useState(false);

    function onSub() {
        (async () => {
            try {
                setIsLoadingSub(true);
                await fetch(`https://oauth.reddit.com/api/subscribe?sr_name=${data.name}&action=${isSubscriber ? 'unsub' : 'sub'}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem('JWTReddit')}`
                    },
                    body: {}
                })
                setIsLoadingSub(false);
                setIsSubscriber(prevState => !prevState);
            } catch (err) {
                if (err.response) {
                    setIsLoadingSub(false);
                    setIsError(true);
                }
            }
        })()

    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/about`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                setData({
                    name: response.data.data.display_name,
                    title: response.data.data.title,
                    description: response.data.data.public_description,
                    urlBanner: response.data.data.banner_background_image.replaceAll("amp;", ""),
                    logo: response.data.data.icon_img.replaceAll("amp;", ""),
                    subscriber: response.data.data.subscribers,
                    activeAccount: response.data.data.accounts_active,
                });
                setIsSubscriber(response.data.data.user_is_subscriber)
                setIsLoading(false);
                console.log(response.data.data)
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [subreddit])

    if (isLoading)
        return <Grid container item xs={12} style={{height: '100%'}} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container item xs={12}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <Paper elevation={6} style={{width: '100%', height: '100%', borderRadius: 0}}>
            <Grid container item xs={12} style={{background: 'whitesmoke'}}>
                <img alt={data.title} src={data.urlBanner} style={{width: '100%', height: '170px'}}/>
            </Grid>
            <Grid container item xs={12} style={{position: 'relative', top: "-40px"}} justifyContent={'space-around'}
                  alignItems={'center'}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={data.title} src={data.logo}
                                    style={{height: 100, width: 100, border: '5px solid white', background: 'white'}}/>
                        </ListItemAvatar>
                        <ListItemText primary={data.title} secondary={`r/${subreddit}`}/>
                    </ListItem>
                </List>
                <LoadingButton variant={'outlined'} loading={isLoadingSub} style={{borderRadius: 20}} onClick={onSub}>
                    {isSubscriber ? 'Unsubscribe' : 'SUBSCRIBE'}
                </LoadingButton>
            </Grid>
        </Paper>
        <Grid container item xs={12}>
            <Grid container item xs={9} style={{height: '100%', paddingTop: 10}}>
                <Paper elevation={6} style={{width: '100%', height: '68px', marginBottom: 30, borderRadius: 0, position: 'sticky', top: 0, zIndex: 9}}>
                    <Grid container item xs={7} style={{height: '100%'}} alignItems={'center'} justifyContent={'space-around'}>
                        {
                            dataSearch.map((item, index) => <Chip button onClick={() => setFilter(item.value)} key={`${item.name} == ${index}`} icon={item.icon}
                                                                  label={item.label}/>)
                        }
                    </Grid>
                </Paper>
            </Grid>
            <Grid container item xs={3} style={{padding: 10}} alignItems={'flex-start'}>
                <Paper elevation={6} style={{width: '100%', borderRadius: 0}}>
                    <Grid container item xs={12} style={{padding: 10}}>
                        <Typography>
                            À propos de la communauté
                        </Typography>
                    </Grid>
                    <Divider/>
                    <Grid container item xs={12} style={{padding: 10}}>
                        <Typography>
                            {data.description}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon size={'large'}/>
                                </ListItemIcon>
                                <ListItemText primary={data.subscriber} secondary={`Number of Subscriber`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ConnectWithoutContactIcon size={'large'}/>
                                </ListItemIcon>
                                <ListItemText primary={data.activeAccount} secondary={`Number of Active Account`}/>
                            </ListItem>
                        </List>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Grid>
}