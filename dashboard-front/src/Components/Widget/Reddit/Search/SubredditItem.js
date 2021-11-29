import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import AlertError from "../../../Tools/AlertError";
import axios from "axios";

function SubscribeToReddit({data}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [isSubscriber, setIsSubscriber] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingData(true)
                const response = await axios.get(`https://oauth.reddit.com/r/${data.name}/about`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                setIsSubscriber(response.data.data.user_is_subscriber)
                setIsLoadingData(false)
            } catch (err) {
                if (err.response) {
                    setIsError(true)
                    setIsLoadingData(false)
                }
            }
        })()
    }, [])

    function onSub() {
        (async () => {
            try {
                setIsLoading(true);
                await fetch(`https://oauth.reddit.com/api/subscribe?sr_name=${data.name}&action=${isSubscriber ? 'unsub' : 'sub'}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem('JWTReddit')}`
                    },
                    body: {}
                })
                setIsLoading(false);
                setIsSubscriber(prevState => !prevState);
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }

    if (isLoadingData)
        return <LoadingButton variant={'outlined'} loading={isLoadingData} style={{borderRadius: 20}} onClick={onSub}>
                Loading Data
            </LoadingButton>

    return <>
        <AlertError isError={isError} setIsError={setIsError}/>
        <LoadingButton variant={'outlined'} loading={isLoading} style={{borderRadius: 20}} onClick={onSub}>
            {isSubscriber ? 'Unsubscribe' : 'SUBSCRIBE'}
        </LoadingButton>
    </>
}

export default function SubredditItem({data}) {
    return <ListItem secondaryAction={
        <SubscribeToReddit data={data}/>
    } style={{width: '100%'}}>
        <ListItemAvatar>
            <Avatar alt={data.name} src={data.logo}/>
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={data.subscribers}/>
    </ListItem>
}