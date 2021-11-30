import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Typography} from "@mui/material";
import dataTheme from "./dataTheme";

export default function DialogTheme({open, handleClose, handleChangeTheme}) {
    return <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth>
        <DialogTitle>
            Theme
        </DialogTitle>
        <DialogContent>
            <Grid container item xs={12} spacing={2} justifyContent={'space-around'}>
                {dataTheme.map(item => <Grid key={`${item.label} - ${item.id}`} container item xs={4} onClick={() => handleChangeTheme(item.primary, item.secondary)}>
                    <Paper elevation={3} style={{width: '100%'}}>
                        <Grid container item xs={12} style={{height: 100}}>
                            <Grid item xs={6} style={{height: '100%', background: item.primary, borderTopLeftRadius: 8}}/>
                            <Grid item xs={6} style={{height: '100%', background: item.secondary, borderTopRightRadius: 8}}/>
                        </Grid>
                        <Grid container item xs={12} justifyContent={'center'}>
                            <Typography variant={'button'} style={{fontWeight: 'bold'}}>
                                {item.label}
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>)}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant={'contained'} color={'secondary'} onClick={() => handleClose()}>
                Exit
            </Button>
        </DialogActions>
    </Dialog>
}