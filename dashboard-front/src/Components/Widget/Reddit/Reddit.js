import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, Paper, Typography} from "@mui/material";
import AlertError from "../../Tools/AlertError";
import LockIcon from "@mui/icons-material/Lock";
import {REDDIT_POSTS, REDDIT_SEARCH} from "../config";
import Posts from "./Posts/Posts";
import axios from "axios";
import Search from "./Search/Search";

export default function Reddit({widget}) {
    const [isConnected, setIsConnected] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleConnected = (isToConnect) => {
        setIsConnected(isToConnect);
    }

    let redditComponents = [
        {id: REDDIT_POSTS, component: <Posts handleConnected={handleConnected}/>},
        {id: REDDIT_SEARCH, component: <Search handleConnected={handleConnected}/>},
    ]

    useEffect(() => {
        if (localStorage.getItem('JWTReddit'))
            setIsConnected(true);
    }, [])

    function onRedirectToReddit() {
        (async () => {
            try {
                let scope = 'identity+read+account+mysubreddits+subscribe+vote+save+history';
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/apiRedditInfo`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${response.data.clientId}&response_type=code&redirect_uri=${response.data.redirectUri}&duration=temporary&scope=${scope}&state=code_authorize`;
            } catch (err) {
                if (err.response)
                    setIsError(true)
            }
        })()
    }

    if (!isConnected)
        return <Grid container item xs={12} style={{height: '100%'}} alignItems={'center'} justifyContent={'center'}>
            <AlertError setIsError={setIsError} isError={isError}/>
            <Grid item xs={12} style={{
                height: 'calc(100% - 37px)',
                position: 'absolute',
                top: '37px'
            }}>
                <img alt={'Background reddit'} src={'/Images/WallPaper/reddit.jpeg'} style={{width: '100%', height: '100%'}}/>
            </Grid>
            <Grid container item xs={7} lg={7} xl={10} style={{zIndex: 5}}>
                <Paper style={{width: '100%', padding: 30}} elevation={6}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                            <Avatar sx={{m: 1, bgcolor: 'red'}}>
                                <LockIcon/>
                            </Avatar>
                            <Typography variant='h4'>
                                Your are not connected
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent={'center'}>
                            <Typography variant='body1'>
                                Please, can you connect to your Reddit account.
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent={'center'}>
                            <Button fullWidth variant={'contained'} color={'primary'} onClick={() => onRedirectToReddit()}>
                                Connect to reddit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    return redditComponents.find(elem => elem.id === widget).component;
}