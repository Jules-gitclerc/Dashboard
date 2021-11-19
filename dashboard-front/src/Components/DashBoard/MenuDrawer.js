import {
    Avatar,
    Box, Collapse,
    Divider,
    Drawer,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar
} from "@mui/material";
import React, {useState} from "react";
import pagesConfig from "./pagesConfig";
import {useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router";
import serviceConfig from "../Widget/config";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const drawerWidth = 200;


function CollapseServiceWidget({data, handleNewItem, items}) {
    const [openCollapse, setOpenCollapse] = useState(false);

    const handleClickCollapse = () => {
        setOpenCollapse(!openCollapse);
    };

    return <ListItem button onClick={handleClickCollapse}>
        <ListItemIcon>
            <Avatar src={data.logo} alt={`${data.label} ${data.id}`} />
        </ListItemIcon>
        <ListItemText primary={data.label}/>
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {data.widget.map(item => <ListItemButton disabled={items.indexOf(item)} key={`Widget ${item.id}`} sx={{ pl: 4 }} onClick={() => {handleNewItem(item)}}>
                    <ListItemText primary={item.label} />
                </ListItemButton>)}
            </List>
        </Collapse>
    </ListItem>
}


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
                {serviceConfig.map(item => <CollapseServiceWidget key={`Service = ${item.id}`} data={item} handleNewItem={handleNewItem} items={items} />)}
            </List>
        </Box>
    </Drawer>
}
