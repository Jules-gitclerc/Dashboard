import React, {useEffect, useState} from 'react'
import {TextField, Autocomplete, Box} from "@mui/material";
import axios from "axios";

export default function AutocompleteCountry({selected, handleSelect, disabled = false, isRequired = false}) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/weather/country`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setCountries(response.data)
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])

    return (
        <Autocomplete
            options={countries}
            autoHighlight
            fullWidth
            value={selected}
            onChange={(event, option) => handleSelect(option)}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required={isRequired}
                    disabled={disabled}
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}