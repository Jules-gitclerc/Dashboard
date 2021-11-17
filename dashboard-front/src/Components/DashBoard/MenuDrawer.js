import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import React from "react";
import pagesConfig from "./pagesConfig";
import {useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router";

const drawerWidth = 200;

export default function MenuDrawer() {
    const history = useHistory();
    const {url} = useRouteMatch()

    return <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
    >
        <Toolbar/>
        <Box sx={{overflow: 'auto'}}>
            {pagesConfig.map(item => <div key={`Service = ${item.id}`}>
                <List dense>
                    <ListItem button onClick={() => history.push(`${url}${item.redirect}`)}>
                        <ListItemIcon>
                            <img alt={item.name} src={item.logo} style={{width: 30, height: 'auto'}}/>
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                    {item.widget.map(elem => <ListItem button key={`Widget = ${elem.id}`} onClick={() => history.push(`${url}${elem.redirect}`)}>
                        <ListItemIcon>
                            {elem.icon}
                        </ListItemIcon>
                        <ListItemText primary={elem.name}/>
                    </ListItem>)}
                </List>
                <Divider/>
            </div>)}
        </Box>
    </Drawer>
}
