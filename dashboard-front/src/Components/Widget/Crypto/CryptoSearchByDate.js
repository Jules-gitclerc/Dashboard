import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";
import AutocompleteCryto from "./AutocompleteCrypto";
import DPicker from "./DPicker";
import axios from 'axios';
import moment from 'moment';

function DisplayCurrency({data, isLoading}) {
    if (isLoading)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    if (!data)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}} justifyContent={'center'} alignItems={'center'}>
            No Data Selected
        </Grid>

    return <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'} spacing={2} style={{padding: 10}}>
        <Grid item xs={4}>
            <Paper style={{width: '100%', margin: 10}}>
                <Grid item xs={12}>
                    <Grid item xs={4}>
                        <img alt={data.id} src={data.image.small} style={{width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid item xs={8}>
                        Current Price
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{data.market_data.current_price.eur}</Typography>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <Paper style={{width: '100%', margin: 10}}>
                <Grid item xs={12}>
                    <Grid item xs={4}>
                        <img alt={data.id} src={data.image.small} style={{width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid item xs={8}>
                        Market Cap
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{data.market_data.market_cap.eur}</Typography>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <Paper style={{width: '100%', margin: 10}}>
                <Grid item xs={12}>
                    <Grid item xs={4}>
                        <img alt={data.id} src={data.image.small} style={{width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid item xs={8}>
                        Total Volume
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{data.market_data.total_volume.eur}</Typography>
                </Grid>
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
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}/history?date=${moment(date).format('DD-MM-YYYY')}`);
                setData(response.data);
                setIsLoading(false)
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