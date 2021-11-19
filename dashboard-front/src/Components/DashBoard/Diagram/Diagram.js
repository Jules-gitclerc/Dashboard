import React, {useState} from 'react'
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Avatar, Divider, Grid, IconButton, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {}
    }
    return ls[key];
}

export default function Diagram({items, setItems}) {
    const [layouts, setLayouts] = useState(
        getFromLS("layouts")
    );

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };

    const onRemoveItem = (itemId) => {
        setItems(items.filter((i) => i !== itemId));
    };

    return <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        width={1000}
        onLayoutChange={onLayoutChange}
    >
        {items.map((key) => (
            <div
                key={key.id}
                className="widget"
                data-grid={key.size}
            >
                <Paper style={{height: '100%', width: "100%"}} elevation={6}>
                    <Grid container item xs={12} justifyContent={'space-between'} style={{background: 'lightgray', borderRadius: '5px 5px 0px 0px'}}>
                        <Grid item>
                            <IconButton style={{padding: 2}} onClick={() => onRemoveItem(key)}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            {key.label}
                        </Grid>
                        <Grid item>
                            <Avatar alt={key.label} src={key.logoService} style={{height: 30, width: 30}}/>
                        </Grid>
                    </Grid>
                    <Divider/>
                    {key.component}
                </Paper>
            </div>
        ))}
    </ResponsiveGridLayout>
}