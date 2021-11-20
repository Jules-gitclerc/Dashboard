import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React from "react";

export default function SubredditItem({data}) {
    return <ListItem>
        <ListItemAvatar>
            <Avatar alt={data.name} src={data.logo}/>
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={data.subscribers}/>
    </ListItem>
}