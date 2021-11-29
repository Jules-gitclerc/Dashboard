import React from 'react'
import {CircularProgress, Grid, Typography} from "@mui/material";

export default function ChampionDisplay({data, isLoading}) {
    if (isLoading || !data)
        return <Grid container item xs={12} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container item xs={12} style={{height: 'calc(100% - 120px)'}}>
        <Grid container item xs={3} style={{height: '100%'}}>
            <Grid container item xs={12} style={{height: 'calc(100% - 30px)'}} justifyContent={'center'}>
                <img alt={data.name}
                     src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.id}_0.jpg`}
                     style={{height: '100%', width: 'auto'}}/>
            </Grid>
            <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: 15}}>
                <Typography>
                    {data.name}
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={9} style={{height: '100%'}}>
            <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: 15}}>
                <Typography style={{fontSize: 11}}>
                    {data.lore}
                </Typography>
            </Grid>
        </Grid>
    </Grid>

}