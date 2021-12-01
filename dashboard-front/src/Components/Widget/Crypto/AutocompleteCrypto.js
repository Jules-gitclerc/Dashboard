import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Autocomplete, Box, TextField} from "@mui/material";

export default function AutocompleteCryto({selected, handleSelect, disabled = false, isRequired = false}) {
    const [crypto, setCrypto] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
                let data = []

                response.data.forEach(elem => {
                    if (elem.name.split(' ').length <= 1)
                        data.push(elem);
                })
                setCrypto(data)
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])

    return (
        <Autocomplete
            options={crypto}
            autoHighlight
            fullWidth
            value={selected}
            onChange={(event, option) => handleSelect(option)}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name} ({option.symbol})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    required={isRequired}
                    disabled={disabled}
                    {...params}
                    label="Choose your crypto"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}