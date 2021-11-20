import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid} from "@mui/material";
import AlertError from "../../../Tools/AlertError";
import axios from "axios";

export default function Profile({handleConnected}) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://oauth.reddit.com/api/v1/me`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                setData(
                    {
                        avatar: response.data.subreddit.icon_img.replaceAll("amp;", ""),
                        banner: response.data.subreddit.banner_img.replaceAll("amp;", ""),
                        name: response.data.name,
                        karma: response.data.link_karma,
                        coins: response.data.coins,
                        friendsNumber: response.data.num_friends,
                    }
                );

                setIsLoading(false);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem('JWTReddit')
                        handleConnected(false)
                    }
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [handleConnected])


    if (isLoading || !data)
        return <Grid container item xs={12} style={{height: '100%'}} justify={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container item xs={12}>
        <AlertError isError={isError} setIsError={setIsError}/>
        {JSON.stringify(data)}
    </Grid>
}