import {
    Avatar,
    Box, Button, Collapse,
    Divider,
    Drawer, IconButton,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar
} from "@mui/material";
import React, {useState} from "react";
import pagesConfig from "./pagesConfig";
import {Redirect, useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router";
import serviceConfig from "../Widget/config";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import AlertError from "../Tools/AlertError";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from "@mui/icons-material/Menu";
import DialogServices from "./DialogServices/DialogServices";

export const drawerWidth = 200;

function CollapseServiceWidget({data, handleNewItem, items}) {
    const [openCollapse, setOpenCollapse] = useState(false);

    const handleClickCollapse = () => {
        setOpenCollapse(!openCollapse);
    };

    return <><ListItem button onClick={handleClickCollapse}>
        <ListItemIcon>
            <Avatar src={data.logo} alt={`${data.label} ${data.id}`} style={{height: 30, width: 30}}/>
        </ListItemIcon>
        <ListItemText primary={data.label}/>
        {openCollapse ? <ExpandLess/> : <ExpandMore/>}
    </ListItem>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense style={{marginLeft: 20}}>
                {data.widget.map(item => <ListItemButton disabled={!!items.find(elem => elem.id === item.id)}
                                                         key={`Widget ${item.id}`} onClick={() => {
                    handleNewItem(item)
                }}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label}/>
                </ListItemButton>)}
            </List>
        </Collapse></>
}


export default function MenuDrawer({items, handleNewItem, userData, drawerOpen, handleDrawer, hotReload}) {
    const history = useHistory();
    const {url} = useRouteMatch();
    const [isLogout, setIsLogout] = useState(false);
    const [isError, setIsError] = useState(false);
    const [openMoreService, setOpenMoreService] = useState(false);

    function clientDisconnect() {
        (async () => {
            try {
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/disconnect`, {},
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setIsLogout(true);
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
        })()
    }

    if (isLogout) {
        localStorage.clear();
        return <Redirect to={'/'}/>
    }

    const handleCloseDialogServices = (isToReload) => {
        hotReload(isToReload)
        setOpenMoreService(false);
    }

    return <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
    >
        <Toolbar>
            <IconButton onClick={() => handleDrawer(!drawerOpen)}>
                <MenuIcon/>
            </IconButton>
        </Toolbar>
        <AlertError isError={isError} setIsError={setIsError}/>
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
                dense
                component="nav"
                subheader={
                    <ListSubheader component="div">
                        Services and Widget
                    </ListSubheader>
                }
            >
                {serviceConfig.map(item => {
                    if (userData.services.find(elem => elem.id_service === item.id))
                        return <CollapseServiceWidget key={`Service = ${item.id}`} data={item}
                                           handleNewItem={handleNewItem} items={items}/>
                    return null;
                })}
                <ListItem>
                    <Button startIcon={<AddIcon/>} fullWidth variant={'contained'}
                            style={{padding: 0, borderRadius: 10}} onClick={() => setOpenMoreService(true)}>
                        More Service
                    </Button>
                </ListItem>
            </List>
            <Divider/>
            <List component="nav" dense>
                <ListItemButton onClick={() => clientDisconnect()}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItemButton>
            </List>
        </Box>
        <DialogServices open={openMoreService} handleClose={handleCloseDialogServices} userData={userData}/>
    </Drawer>
}
