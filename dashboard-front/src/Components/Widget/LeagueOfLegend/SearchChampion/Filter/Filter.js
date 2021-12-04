import React from 'react';
import {Grid} from "@mui/material";
import AutocompleteChampion from "./AutocompleteChampion";

export default function Filter({selected, setSelected}) {

    return <Grid container item xs={12} style={{padding: 10}}>
        <Grid item xs={6}>
            <AutocompleteChampion handleChange={setSelected} value={selected} filter={""} />
        </Grid>

    </Grid>

}