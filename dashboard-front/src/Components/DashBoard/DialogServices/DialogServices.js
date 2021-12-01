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
import axios from "axios";

export default function DialogServices({open, handleClose, userData}) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (!open)
            return;
        (async () => {
            try {
                let tab = []
                serviceConfig.forEach(elem => {
                    tab.push({
                        id: elem.id,
                        label: elem.label,
                        logo: elem.logoService,
                        checked: !!userData.services.find(item => item.id_service === elem.id),
                    })
                })
                setData(tab);
            } catch (err) {
                if (err.response) {
                    setIsLoading(false)
                    setIsError(true)
                }
            }
        })()
    }, [open, userData])

    async function SubChange() {
        try {
            setIsLoading(true)
            await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/user/services/edit`, data, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
            setIsLoading(false)
            handleClose(true);
        } catch (err) {
            if (err.response) {
                setIsError(true)
                setIsLoading(false)
            }
        }
    }

    return <Dialog open={open} handleClose={() => handleClose(false)} fullWidth maxWidth={'sm'}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <DialogTitle>
            Services
        </DialogTitle>
        <DialogContent style={{overflow: 'auto'}}>
            <Grid container item xs={12} style={{marginTop: 10}}>
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
                    {data.map((item, index) => {
                        if (item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                            return <ListItem key={`Services manager = ${item.id} ${item.label}`}
                                             secondaryAction={
                                                 <Checkbox color={'primary'} edge="end"
                                                           checked={item.checked}
                                                           onChange={() => {
                                                                data[index].checked = !data[index].checked
                                                                setData([...data]);
                                                           }}
                                                 />
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
            <Button disabled={isLoading} color={'secondary'} variant={'contained'} onClick={() => handleClose(false)}>
                Cancel
            </Button>
            <LoadingButton loading={isLoading} color={'primary'} variant={'contained'} onClick={async () => await SubChange()}>
                Save
            </LoadingButton>
        </DialogActions>
    </Dialog>
}