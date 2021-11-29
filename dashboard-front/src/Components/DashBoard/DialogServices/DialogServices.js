import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    List,
    ListItem, ListItemIcon, ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import AlertError from "../../Tools/AlertError";
import serviceConfig from "../../Widget/config";

export default function DialogServices({open, handleClose}) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                serviceConfig.forEach(elem => {
                    data.push({
                        id: elem.id,
                        label: elem.label,
                        logo: elem.logo,
                        checked: false,
                    })
                })
                setData([...data]);
            } catch (err) {
                if (err.response) {
                    setIsLoading(false)
                    setIsError(true)
                }
            }
        })()
    })

    return <Dialog open={open} handleClose={handleClose}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <DialogTitle>
            Services
        </DialogTitle>
        <DialogContent>
            <Grid container item xs={12}>
                <TextField label={'Search services'} variant={'outlined'} fullWidth value={search}
                           onChange={(e) => setSearch(e.target.value)}/>
                <List
                    dense
                    component="nav"
                    style={{width: '100%', marginBottom: 10}}
                    subheader={
                        <ListSubheader component="div">
                            Services and Widget
                        </ListSubheader>
                    }
                >
                    {data.map(item => {
                        if (item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                            return <ListItem key={`Services manager = ${item.id} ${item.label}`}
                                             secondaryAction={
                                                 <Checkbox color={'primary'} edge="end"
                                                           checked={item.checked}/>
                                             }>
                                <ListItemIcon>
                                    <Avatar src={item.logo} alt={`${item.label} ${item.id}`} style={{height: 30, width: 30}}/>
                                </ListItemIcon>
                                <ListItemText primary={item.label}/>
                            </ListItem>
                        return null;
                    })}
                </List>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button disabled={isLoading} color={'secondary'} variant={'contained'}>
                Cancel
            </Button>
            <LoadingButton loading={isLoading} color={'primary'} variant={'contained'}>
                Save
            </LoadingButton>
        </DialogActions>
    </Dialog>
}