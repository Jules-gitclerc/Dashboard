import React, {useState} from 'react';
import {Grid} from "@mui/material";
import AutocompleteCryto from "./AutocompleteCrypto";

export default function CryptoSearchData() {
    const [cypto, setCrypto] = useState(null);

    return <Grid container item={12}>
        <AutocompleteCryto selected={cypto} handleSelect={setCrypto}/>

    </Grid>

}