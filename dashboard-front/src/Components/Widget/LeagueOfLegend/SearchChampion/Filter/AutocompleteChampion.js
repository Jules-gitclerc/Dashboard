import React, {useEffect, useState} from 'react'
import AlertError from "../../../../Tools/AlertError";
import axios from "axios";
import {Autocomplete} from "@mui/lab";
import {Box, TextField} from "@mui/material";

export default function AutocompleteChampion({value, handleChange, filter = ''}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/leagueOfLegend/champion?filter=${filter}`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                if (response.data.error)
                    setData([])
                else
                    setData(response.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false);
                setIsError(true)
            }
        })()
    }, [filter])

    return <>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Autocomplete
            disabled={isLoading}
            disablePortal
            options={data}
            getOptionLabel={(option) => option.name}
            autoHighlight
            sx={{width: '100%'}}
            onChange={(event, option) => handleChange(option)}
            value={value}
            renderOption={(props, option) => (
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <img
                        loading="lazy"
                        width="40"
                        src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${option.image.full}`}
                        alt={option.id}
                    />
                    {option.name}
                </Box>
            )}

            renderInput={(params) => <TextField
                {...params}
                label="Choose your champion"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
            />}
        /></>
}