import React from 'react';
import {CircularProgress, Grid} from "@mui/material";

export default function WeatherSearchDisplay({data, isLoading}) {
    if (isLoading)
        return <Grid container item xs={12} justifyContent={'center'} style={{height: '100%'}} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    if (!data)
        return <Grid container item xs={12} justifyContent={'center'}>
            Select your country and city for display weather
        </Grid>

    return <Grid container item xs={12}>
        {JSON.stringify(data)}
    </Grid>

}