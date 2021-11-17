import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {Redirect, useRouteMatch} from "react-router";
import Posts from './Posts/Posts'
import Search from "./Search/Search";
import Profile from './Profile/Profile'
import {Avatar, Button, Grid, Paper, Typography} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import AlertError from "../Tools/AlertError";
import axios from "axios";
import Subreddit from "./Subreddit/Subreddit";

export default function Reddit() {
    const {url} = useRouteMatch()
    const [isConnected, setIsConnected] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log("en bas la")
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
                height: 'calc(100% - 67px)',
                position: 'absolute',
                top: '64px'
            }}>
                <img alt={'Background reddit'} src={'/Images/WallPaper/reddit.jpeg'} style={{width: '100%', height: '100%'}}/>
            </Grid>
            <Grid container item xs={5} style={{zIndex: 5}}>
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

    return <>
        <Route exact path={`${url}/`}
               render={() => <Redirect to={`${url}/Posts`}/>}/>
        <Route exact path={`${url}/Posts`}>
            <Posts/>
        </Route>
        <Route exact path={`${url}/r/:subreddit`}>
            <Subreddit/>
        </Route>
        <Route exact path={`${url}/Search`}>
            <Search/>
        </Route>
        <Route exact path={`${url}/Profile`}>
            <Profile/>
        </Route>
    </>
}


