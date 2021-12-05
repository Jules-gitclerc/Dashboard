import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import AutocompleteCryto from "./AutocompleteCrypto";
import DPicker from "./DPicker";
import axios from 'axios';
import moment from 'moment';

function DisplayCurrency({data, isLoading}) {
    const [dataSelect, setDataSelect] = useState([]);
    const [selected, setSelected] = useState('eur');

    useEffect(() => {
        if (data && data.market_data) {
            let tab = []

            for (let index in data.market_data.current_price) {
                tab.push(index)
            }
            setDataSelect(tab);
        }
    }, [data])

    if (isLoading)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}}
                     justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid>

    if (!data)
        return <Grid container item xs={12} style={{padding: 10, height: 'calc(100% - 125px)'}}
                     justifyContent={'center'} alignItems={'center'}>
            No Data Selected
        </Grid>

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'} spacing={2}
                 style={{padding: 10, height: 'calc(100% - 125px)'}}>
        <Grid item xs={3} container alignItems={'center'} style={{display: 'block'}}>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                        value={selected}
                        label="Currenc"
                        onChange={handleChange}
                    >
                        {dataSelect.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <img alt={data.id} src={data.image.small} style={{width: '100%', height: 'auto'}}/>
            </Grid>
        </Grid>
        {!data.market_data && <Grid item xs={9} container alignItems={'space-around'} justifyContent={'center'}>
            No market data from this date
        </Grid>}
        <Grid item xs={9} container alignItems={'space-around'}>
            {data.market_data && <Grid item xs={12}>
                <Paper style={{width: '100%', margin: 10}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Current Price
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        <Typography>{data.market_data.current_price[selected]} {selected}</Typography>
                    </Grid>
                </Paper>
            </Grid>}
            {data.market_data && <Grid item xs={12}>
                <Paper style={{width: '100%', margin: 10}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Market Cap
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        <Typography>{data.market_data.market_cap[selected]} {selected}</Typography>
                    </Grid>
                </Paper>
            </Grid>}
            {data.market_data && <Grid item xs={12}>
                <Paper style={{width: '100%', margin: 10}}>
                    <Grid container item xs={12} justifyContent={'center'}>
                        Total Volume
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        <Typography>{data.market_data.total_volume[selected]} {selected}</Typography>
                    </Grid>
                </Paper>
            </Grid>}
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