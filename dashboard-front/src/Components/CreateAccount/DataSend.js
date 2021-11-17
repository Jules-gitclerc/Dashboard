import React from "react";
import {Avatar, Button, Grid, Paper, Typography} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

export default function DataSend({handleTriggerConnected}) {
    return <Grid component={Paper} elevation={6} container item xs={12} sm={8} md={6}
                 style={{height: '100%', padding: 30, alignContent: 'center'}} alignItems={'center'}>
        <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'} style={{marginBottom: 30}}>
            <Avatar sx={{m: 1, bgcolor: 'red'}}>
                <EmailIcon/>
            </Avatar>
            <Typography variant='h4'>
                Go on your mail box !
            </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent={'center'} style={{height: 50, marginBottom: 30}}>
            <Typography style={{textAlign:'center'}}>
                An email has been sent to you with an identification link. Click on it to activate your account and get enough YODASH!
            </Typography>
        </Grid>
        <Grid container item xs={12}>
            <Button fullWidth variant={"contained"} onClick={() => handleTriggerConnected(true)}>
                GO TO YODASH !
            </Button>
        </Grid>
    </Grid>
}