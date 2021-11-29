import React from 'react'
import {Grid, Typography} from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function DisplayDataUser({data}) {
    return <Grid container item xs={9} style={{padding: 10}}>
        <Grid container item xs={4} alignItems={'center'} justifyContent={'space-around'}>
            <Grid item xs={1}>
                <SupervisedUserCircleIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={10}>
                <Typography>
                    {data.username}
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={8} alignItems={'center'} spacing={2}>
            <Grid container item xs={1} justifyContent={'flex-end'}>
                <PersonIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={10}>
                <Typography>
                    {data.name}
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={7} alignItems={'center'} spacing={2}>
            <Grid item xs={1}>
                <EmailIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={8}>
                <Typography>
                    {data.email}
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={4} alignItems={'center'} spacing={2}>
            <Grid item xs={1}>
                <LocalPhoneIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={10}>
                <Typography>
                    {data.phone}
                </Typography>
            </Grid>
        </Grid>
    </Grid>
}