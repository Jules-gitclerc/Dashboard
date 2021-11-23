import React, {useState} from 'react';
import {Grid} from "@mui/material";
import AutocompleteChampion from "./AutocompleteChampion";

export default function SearchChampion() {
    const [select, setSelect] = useState(null);

    return <Grid container item xs={12} style={{height: '100%'}}>
        <Grid container item xs={12} style={{padding: 10}}>
            <AutocompleteChampion handleChange={setSelect} value={select} />
        </Grid>
        {select ? <Grid container item xs={12}>
            <Grid item xs={2}>
                <img alt={select.name} src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${select.image.full}`}/>
            </Grid>
            {console.log(select)}
        </Grid> : <Grid container item xs={12} alignItems={'center'} justifyContent={'center'}>
            Select one champion for see description
        </Grid>}


    </Grid>
}