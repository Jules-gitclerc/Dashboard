import React, {useState} from "react";
import {
    Avatar,
    Grid, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Toolbar,
    Typography,
    AppBar
} from "@mui/material";
import MenuClient from "./MenuClient/MenuClient";
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuAppBar({userData, drawerOpen, handleDrawer, handleThemeChange}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenuPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenuPopover = () => {
        setAnchorEl(null);
    };

    return <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.dark' }}>
        <Toolbar>
            <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'} style={{height: '100%'}}>
                <Grid container item xs={2} alignItems={'center'} justifyContent={"space-between"}>
                    <Grid container item xs={1} style={{height: '100%'}} alignItems={'center'} justifyContent={'center'} direction={'column'}>
                        <IconButton onClick={() => handleDrawer(!drawerOpen)}>
                            <MenuIcon color="secondary"/>
                        </IconButton>
                    </Grid>
                    <Grid container item xs={7} style={{height: '100%', border: '1px solid', padding: 8, borderRadius: 20}} alignItems={'center'} justifyContent={'space-around'}>
                        <img alt={'yoda'} src={'/Images/yodapetit.png'} style={{height: '30px', width: 'auto'}}/>
                        <Typography variant="button" noWrap component="div" style={{fontWeight: 'bold'}}>
                            YODASH
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <List dense style={{padding: 0}}>
                        <ListItem button onClick={handleOpenMenuPopover}>
                            <ListItemAvatar>
                                <Avatar alt={userData.username} src={userData.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={userData.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="secondary"
                                        >
                                            {userData.name}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
                <MenuClient anchorEl={anchorEl} handleCloseMenuPopover={handleCloseMenuPopover} handleThemeChange={handleThemeChange}/>
            </Grid>
        </Toolbar>
    </AppBar>
}