import React from 'react';
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";

export default function WeatherSearchDisplay({data, isLoading}) {
    if (isLoading)
        return <Grid container item xs={12} justifyContent={'center'} style={{height: 'calc(100% - 125px)'}}
                     alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    if (!data)
        return <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}
                     style={{height: 'calc(100% - 125px)'}}>
            Select your country and city for display weather
        </Grid>

    return <Grid container item xs={12} style={{height: 'calc(100% - 125px)'}}>
        <Grid container item xs={4} style={{height: '100%'}} justifyContent={'space-around'} alignItems={'center'}
              direction={'column'}>
            <img alt={data.weather[0].main} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                 style={{width: 100, height: 'auto'}}/>
            <Typography>
                {data.weather[0].main}
            </Typography>
            <Typography>
                {data.weather[0].description}
            </Typography>
            <Typography>
                lat: {data.coord.lat} / lon: {data.coord.lon}
            </Typography>
        </Grid>
        <Grid container item xs={8} spacing={1} style={{padding: 5}} justifyContent={'space-around'} alignItems={'center'}>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Temperature
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.temp}°C
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Feels Like
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.feels_like}°C
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Min Temp
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.temp_min}°C
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Max Temp
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.temp_max}°C
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Pressure
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.pressure} P
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper style={{width: '100%'}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Humidity
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        {data.main.humidity} %
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Grid>

}