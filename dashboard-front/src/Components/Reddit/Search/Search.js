import React, {useEffect, useState} from 'react';
import {
    Avatar,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    TextField
} from "@mui/material";
import AlertError from "../../Tools/AlertError";
import axios from "axios";
import {LoadingButton} from "@mui/lab";

function CardSubreddit({data, setIsError}) {
    const [isSubscriber, setIsSubscriber] = useState(data.isSub);
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


    return <Grid container item xs={9}>
        <Paper elevation={6} style={{width: '100%', height: '100%', borderRadius: 0, marginBottom: 30}}>
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
                        <ListItemText primary={data.title} secondary={`r/${data.name}`}/>
                    </ListItem>
                </List>
                <LoadingButton variant={'outlined'} loading={isLoadingSub} style={{borderRadius: 20}} onClick={onSub}>
                    {isSubscriber ? 'Unsubscribe' : 'SUBSCRIBE'}
                </LoadingButton>
            </Grid>
        </Paper>
    </Grid>
}

export default function Search() {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`https://oauth.reddit.com/api/search_subreddits?query=${search}&include_unadvertisable=true`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem('JWTReddit')}`
                    },
                    body: {}
                })
                if (!res.ok)
                    throw new Error(`${res.status}: ${await res.text()}`)
                let tab = []
                await res.json().then(async res => {
                    res.subreddits.forEach(item => {
                        tab.push({
                            subscribers: item.subscriber_count,
                            logo: item.icon_img,
                            activeUser: item.active_user_count,
                            name: item.name,
                        })
                    })
                })
                let dataJson = []
                for (const item in tab) {
                    const response = await axios.get(`https://oauth.reddit.com/r/${tab[item].name}/about`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                    console.log(response.data);
                    dataJson.push({
                        name: response.data.data.display_name,
                        title: response.data.data.title,
                        urlBanner: response.data.data.banner_background_image.replaceAll("amp;", ""),
                        logo: response.data.data.icon_img.replaceAll("amp;", ""),
                        subscriber: response.data.data.subscribers,
                        isSub: response.data.data.user_is_subscriber,
                    })
                }
                setData(dataJson);
                setIsLoading(false);
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [search])

    return <Grid container item xs={12} style={{height: '100%'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Grid container item xs={4} style={{padding: 10, height: 68}}>
            <TextField fullWidth label={'Search'} type={'search'} variant={'outlined'} value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
        </Grid>
        {isLoading ? <Grid container item xs={12} justifyContent={'center'}>
            <CircularProgress/>
        </Grid> : <Grid container item xs={12} style={{height: 'calc(100% - 68px)', overflow: 'auto'}}>
            {data.map(item => <CardSubreddit key={`${item.name} ${item.title}`} data={item} setIsError={setIsError}/>)}
        </Grid>}

    </Grid>
}