import React, {useState} from "react";
import {
    Divider,
    ListItemText,
    Popover,
    List,
    ListSubheader,
    ListItemButton,
    ListItemIcon
} from "@mui/material";
import {Redirect} from "react-router-dom";
import axios from "axios";
import AlertError from "../../Tools/AlertError";
import {useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router";
import DialogTheme from "../DialogTheme/DialogTheme";
import PersonIcon from '@mui/icons-material/Person';
import PaletteIcon from '@mui/icons-material/Palette';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MenuClient({anchorEl, handleCloseMenuPopover}) {
    const [isLogout, setIsLogout] = useState(false);
    const [isError, setIsError] = useState(false);
    const [openDialogTheme, setOpenDialogTheme] = useState(false);
    const history = useHistory();
    const {url} = useRouteMatch()

    const handleOpenDialogTheme = () => {
        setOpenDialogTheme(true);
    }

    const handleCloseDialogTheme = () => {
        setOpenDialogTheme(false);
    }

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

    return <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenuPopover}
        style={{width: 230}}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
    >
        <AlertError isError={isError} setIsError={setIsError}/>
        <DialogTheme handleClose={handleCloseDialogTheme} open={openDialogTheme}/>
        <List sx={{ width: 230, bgcolor: 'background.paper' }}
              component="nav"
              subheader={
                  <ListSubheader component="div">
                      Account
                  </ListSubheader>
              } dense>
            <ListItemButton onClick={() => history.push(`${url}/Profile`)}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={handleOpenDialogTheme}>
                <ListItemIcon>
                    <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Theme" />
            </ListItemButton>
        </List>
        <Divider/>
        <List sx={{ width: 230, bgcolor: 'background.paper' }}
              component="nav"
              subheader={
                  <ListSubheader component="div">
                      Logout
                  </ListSubheader>
              } dense>
            <ListItemButton onClick={() => clientDisconnect()}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    </Popover>
}