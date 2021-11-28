import React, {useState} from 'react'
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    TextField,
    Checkbox,
} from "@mui/material";
import serviceConfig from "../Widget/config";

export default function ServicesManager({data, isEdit}) {
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
            {serviceConfig.map(item => {
                if (item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                    return <ListItem key={`Services manager = ${item.id} ${item.label}`}
                                     secondaryAction={
                                         <Checkbox disabled={!isEdit} color={'primary'} edge="end"
                                                   checked={!!data.services.find(elem => elem.id_service === item.id)}/>
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
}