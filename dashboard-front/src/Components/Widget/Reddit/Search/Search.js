import React, {useEffect, useState} from 'react'
import {CircularProgress, List, Grid, TextField} from "@mui/material";
import AlertError from "../../../Tools/AlertError";
import SubredditItem from './SubredditItem';

export default function Search({handleConnected}) {
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
                            name: item.name,
                        })
                    })
                })
                setData(tab);
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
    }, [search, handleConnected])

    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Grid container item xs={12} style={{padding: 10, height: 68}} >
            <TextField fullWidth label={'Search'} type={'search'} variant={'outlined'} value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
        </Grid>
        {isLoading ? <Grid container item xs={12} justifyContent={'center'}>
            <CircularProgress/>
        </Grid> : <Grid container item xs={12} style={{height: 'calc(100% - 115px)', overflow: 'auto'}}>
            <List dense style={{width: '100%'}}>
                {data.map(item => <SubredditItem key={`${item.name} ${item.subscribers}`} data={item} setIsError={setIsError}/>)}
            </List>
        </Grid>}

    </Grid>
}