import React, {useState} from 'react';
import {Grid, IconButton, TextField} from "@mui/material";
import AutocompleteCountry from "./AutocompleteCountry";
import SearchIcon from '@mui/icons-material/Search';

export default function CountryFilter({handleFilter}) {
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState('');

    const handleSelect = (value) => {
        setCity('')
        setCountry(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleFilter(country.code, city)
    }

    return <Grid container item xs={12} component={'form'} onSubmit={onSubmit} justifyContent={'space-around'} style={{padding: 10, height: 75}} alignItems={'center'}>
        <Grid item xs={5}>
            <AutocompleteCountry disabled={false} isRequired={true} selected={country} handleSelect={handleSelect}/>
        </Grid>
        <Grid item xs={5}>
            <TextField
                disabled={!country}
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required={true}
                variant={"outlined"}
                fullWidth
                label={'Enter your city'}
            />
        </Grid>
        <Grid item xs={1}>
            <IconButton type={'Submit'}>
                <SearchIcon/>
            </IconButton>
        </Grid>
    </Grid>
}