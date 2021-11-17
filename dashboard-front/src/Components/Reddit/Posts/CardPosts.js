import React from 'react';
import {Avatar, List, Grid, Typography, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {useHistory} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function DisplayRedditMedia({data}) {
    if (data.isVideo) {
        console.log(data.media)
        return <Grid item xs={12}>
            <video width="100%" height="auto" controls >
                <source src={data.media} type="video/mp4"/>
            </video>
        </Grid>
    }

    if (data.isGallery) {
        return <Grid container item xs={12}>
            <Carousel>
                {data.media.map((item, index) => <div key={`${item} ${index}`}>
                    <img src={item} alt={item} />
                </div>)}
            </Carousel>
        </Grid>;
    }

    if (!data.isVideo && !data.isGallery)
        return <Grid item xs={12}>
            <img alt={data.author + data.id} src={data.media} style={{width: '100%'}}/>
        </Grid>


    return null;
}


export default function CardPosts({data}) {
    const history = useHistory();

    return <Grid container item xs={12} style={{marginBottom: 20, background: 'white', borderRadius: 10}}>
        <Grid container item xs={12} style={{paddingTop: 0}}>
            <List dense>
                <ListItem button onClick={() => {
                    history.push(data.subReddit.prefixName);
                }}>
                    <ListItemAvatar>
                        <Avatar alt={data.author} src={data.subReddit.avatar}/>
                    </ListItemAvatar>
                    <ListItemText primary={data.subReddit.prefixName}
                                  secondary={`Created by ${data.author} : ${data.date}`}/>
                </ListItem>
            </List>
        </Grid>
        <Grid container item xs={12} style={{paddingLeft: 5}}>
            <Typography variant={'h6'}>
                {data.title}
            </Typography>
        </Grid>
        <Grid container item xs={12} style={{paddingLeft: 5, marginTop: 10}}>
            <Typography variant={'body1'}>
                {data.text}
            </Typography>
        </Grid>
        <DisplayRedditMedia data={data} />
    </Grid>
}