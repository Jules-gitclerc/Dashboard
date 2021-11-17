import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function DialogTheme({open, handleClose}) {
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Theme Manager [WIP]
        </DialogTitle>
        <DialogContent>
            WIP
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color={'primary'} variant={'contained'}>
                EXIT
            </Button>
        </DialogActions>
    </Dialog>
}