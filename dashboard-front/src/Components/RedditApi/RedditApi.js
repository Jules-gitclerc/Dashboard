import React, {useEffect, useState} from 'react'
import qs from "qs";
import {CircularProgress, Grid} from "@mui/material";
import {Redirect} from "react-router-dom";
import axios from "axios";

export default function RedditApi() {
    const [isRedirect, setIsRedirect] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const infoReddit = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/apiRedditInfo`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})

                const form = new URLSearchParams({
                    grant_type: "authorization_code",
                    code: qs.parse(window.location.search, {ignoreQueryPrefix: true}).code,
                    redirect_uri: infoReddit.data.redirectUri
                })

                const credentials = Buffer.from(`${infoReddit.data.clientId}:${infoReddit.data.clientSecret}`).toString("base64")
                const res = await fetch('https://www.reddit.com/api/v1/access_token', {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`
                    },
                    body: form
                })

                if (!res.ok)
                    throw new Error(`${res.status}: ${await res.text()}`)
                await res.json().then(res => localStorage.setItem('JWTReddit', res.access_token))

                setIsRedirect(true)
            } catch (err) {
                console.log(err)
                setIsRedirect(true)
            }
        })()
    }, [])

    if (isRedirect)
        return <Redirect to={'/'}/>

    return <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
        <CircularProgress/>
    </Grid>
}