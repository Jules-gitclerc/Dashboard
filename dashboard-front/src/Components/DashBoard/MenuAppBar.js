import React, {useState} from "react";
import {
    AppBar,
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuClient from "./MenuClient/MenuClient";

export default function MenuAppBar({userData}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenuPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenuPopover = () => {
        setAnchorEl(null);
    };
    
    return <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'} style={{height: '100%'}}>
                <Grid container item xs={1} style={{height: '100%'}} alignItems={'center'} justifyContent={'center'} direction={'column'}>
                    <img alt={'yoda'} src={'/Images/yodapetit.png'} style={{height: '30px', width: 'auto'}}/>
                    <Typography variant="button" noWrap component="div">
                        YODASH
                    </Typography>
                </Grid>
                <Grid item>
                    <List dense style={{padding: 0}}>
                        <ListItem button onClick={handleOpenMenuPopover}>
                            <ListItemAvatar>
                                <Avatar alt={userData.username} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={userData.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {userData.name}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
                <MenuClient anchorEl={anchorEl} handleCloseMenuPopover={handleCloseMenuPopover}/>
            </Grid>
        </Toolbar>
    </AppBar>
}