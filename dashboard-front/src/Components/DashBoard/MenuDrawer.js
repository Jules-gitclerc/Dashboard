import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Toolbar} from "@mui/material";
import React from "react";
import pagesConfig from "./pagesConfig";
import {useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router";
import widgetConfig from "../Widget/config";

const drawerWidth = 200;

export default function MenuDrawer({items, handleNewItem}) {
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
            <List dense>
                {pagesConfig.map(item => <ListItem key={`Dash = ${item.id} ${item.name}`} button
                              onClick={() => history.push(`${url}${item.redirect}`)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItem>)}
            </List>
            <Divider/>
            <List
                component="nav"
                subheader={
                    <ListSubheader component="div">
                        Services and Widget
                    </ListSubheader>
                }
            >
                {widgetConfig.map(item => <ListItem key={`Service = ${item.id}`} button
                                                   onClick={() => {handleNewItem(item)}}>
                    {/*<ListItemIcon>
                        {item.icon}
                    </ListItemIcon>*/}
                    <ListItemText primary={item.label}/>
                </ListItem>)}
            </List>
        </Box>
    </Drawer>
}
