import React, {useState} from 'react'
import {
    Avatar,
    Button,
    Grid, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";
import serviceConfig from "../Widget/config";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ServicesManager({data}) {
    const [search, setSearch] = useState('');

    return <Grid container item xs={3} style={{padding: 10}}>
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
            {serviceConfig.map(item => <ListItem key={`Services manager = ${item.id} ${item.name}`}
                                                 secondaryAction={
                                                     <IconButton edge="end" aria-label="delete">
                                                         <DeleteIcon />
                                                     </IconButton>
                                                 }>
                <ListItemIcon>
                    <Avatar src={item.logo} alt={`${item.label} ${item.id}`} style={{height: 30, width: 30}}/>
                </ListItemIcon>
                <ListItemText primary={item.label}/>

            </ListItem>)}
        </List>
        <Button startIcon={<SaveIcon/>} fullWidth variant={'contained'}>
            Save
        </Button>
    </Grid>
}