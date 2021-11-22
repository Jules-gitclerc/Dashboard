import React, {useEffect, useState} from 'react';
import {Avatar, CircularProgress, Grid, IconButton, Tooltip} from "@mui/material";
import AlertError from "../Tools/AlertError";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import ServicesManager from "./ServicesManager";

export default function Profile() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/userData`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setData(response.data);
                setIsLoading(false)
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [])

    if (isLoading || !data)
        return <Grid container item xs={12} style={{height: '100%'}} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container item xs={12}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <Grid container item xs={12} justifyContent={'center'}>
            <Grid container item xs={12} style={{height: 150, background: 'lightgray'}}/>
            <Grid container item xs={10} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Avatar alt={data.name} src={data.avatar}
                        style={{height: 150, width: 150, border: '8px solid white', top: -75, position: 'relative'}}/>
                <Tooltip title={'Edit your profile page'}>
                    <IconButton>
                        <EditIcon fontSize={"large"}/>
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={9} style={{padding: 10}}>
                    {JSON.stringify(data)}
                </Grid>
                <ServicesManager />
            </Grid>
        </Grid>
    </Grid>
}