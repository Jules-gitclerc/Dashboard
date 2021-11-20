import React, {useState} from 'react'
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import {LoadingButton} from "@mui/lab";

export default function Subreddit({data, setIsError}) {
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