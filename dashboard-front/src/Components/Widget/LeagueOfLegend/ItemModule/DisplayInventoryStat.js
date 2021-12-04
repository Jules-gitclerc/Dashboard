import React from 'react';
import {Chip, Grid, IconButton, Tooltip} from "@mui/material";

export default function DisplayInventoryStat({dataItem, dataChampion, handleDeleteItem}) {
    return <Grid container item xs={12} justifyContent={'center'} spacing={1} style={{padding: 10}}>
        <Grid item xs={8} style={{padding: 0, margin: 0}}>
            <Chip label={`${dataItem.length} / 6`} color={'primary'} style={{padding: 0, margin: 0}}/>
        </Grid>
        <Grid container item xs={5} spacing={2} style={{height: 125}}>
            {dataItem.map(item => <Grid item xs={4}>
                <Tooltip title={`Delete ${item.name}`}>
                    <IconButton style={{width: '100%'}} onClick={() => handleDeleteItem(item.id)}>
                        <img alt={item.name}
                             src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item.image.full}`}
                             style={{height: 'auto', width: 30}}/>
                    </IconButton>
                </Tooltip>
            </Grid>)}
        </Grid>
        <Grid container item xs={7}>
            stata
        </Grid>
    </Grid>

}