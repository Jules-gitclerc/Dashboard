import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Paper} from "@mui/material";
import AutocompleteCryto from "./AutocompleteCrypto";
import DPicker from "./DPicker";

function DisplayCurrency({data, isLoading}) {
    if (isLoading)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    if (!data)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}} justifyContent={'center'} alignItems={'center'}>
            No Data Selected
        </Grid>

    return <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'}>
        <Grid item xs={5}>
            <Paper style={{width: '100%'}}>
                dd
            </Paper>
        </Grid>
        <Grid item xs={5}>
            <Paper style={{width: '100%'}}>
dd
            </Paper>
        </Grid>
    </Grid>
}

export default function CryptoSearchData() {
    const [crypto, setCrypto] = useState(null);
    const [date, setDate] = useState();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!date || !crypto)
            return;
        (async => {
            try {
                setIsLoading(true)
            } catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        })()
    }, [date, crypto])

    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <Grid container item xs={12} style={{padding: 10, height: 90}} spacing={2}>
            <Grid item xs={6}>
                <AutocompleteCryto selected={crypto} handleSelect={setCrypto}/>
            </Grid>
            <Grid item xs={6}>
                <DPicker handleChange={setDate} value={date} label={'Date'} isRequired={true}/>
            </Grid>
        </Grid>
        <DisplayCurrency data={data} isLoading={isLoading}/>
    </Grid>

}