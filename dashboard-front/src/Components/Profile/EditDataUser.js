import React from 'react';
import {Grid, TextField} from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function EditDataUser({data, setData}) {
    return <Grid container item xs={9} style={{padding: 10}}>
        <Grid container item xs={4} alignItems={'center'} justifyContent={'space-around'}>
            <Grid item xs={1}>
                <SupervisedUserCircleIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={10}>
                <TextField required={true} label={'Username'} fullWidth value={data.username}
                       variant={'outlined'} onChange={(e) => {
                           data.username = e.target.value;
                           setData({...data})
                }}/>
            </Grid>
        </Grid>
        <Grid container item xs={8} alignItems={'center'} spacing={2}>
            <Grid container item xs={1} justifyContent={'flex-end'}>
                <PersonIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={5}>
                <TextField required={true} label={'First Name'} fullWidth value={data.firstName} variant={'outlined'}
                           onChange={(e) => {
                               data.firstName = e.target.value;
                               setData({...data})
                           }}/>
            </Grid>
            <Grid item xs={5}>
                <TextField required={true} label={'Last Name'} fullWidth value={data.lastName} variant={'outlined'}
                           onChange={(e) => {
                               data.lastName = e.target.value;
                               setData({...data})
                           }}/>
            </Grid>
        </Grid>
        <Grid container item xs={7} alignItems={'center'} spacing={2}>
            <Grid item xs={1}>
                <EmailIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={8}>
                <TextField required={true} label={'E-mail'} fullWidth value={data.email} variant={'outlined'}
                           onChange={(e) => {
                               data.email = e.target.value;
                               setData({...data})
                           }}/>
            </Grid>
        </Grid>
        <Grid container item xs={4} alignItems={'center'} spacing={2}>
            <Grid item xs={1}>
                <LocalPhoneIcon fontSize={'large'}/>
            </Grid>
            <Grid item xs={10}>
                <TextField required={true} label={'Phone'} fullWidth value={data.phone} variant={'outlined'}
                           onChange={(e) => {
                               data.phone = e.target.value;
                               setData({...data})
                           }}/>
            </Grid>
        </Grid>
    </Grid>
}