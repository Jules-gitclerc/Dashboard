import React, {useState} from 'react'
import {Grid} from "@mui/material";
import CountryFilter from "./CountryFilter";
import AlertError from "../../Tools/AlertError";
import axios from "axios";
import WeatherSearchDisplay from "./WeatherSearchDisplay";

export default function Weather() {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    async function handleFilter(countryCode, city) {
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/weather/data`, {city: city, countryCode: countryCode},
                {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
            if (response.data.error)
                setIsError(true);
            else
                setData(response.data)
            setIsLoading(false)
        } catch (err) {
            if (err.response) {
                setIsLoading(false)
                setIsError(true)
            }
        }
    }

    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <CountryFilter handleFilter={handleFilter}/>
        <WeatherSearchDisplay data={data} isLoading={isLoading}/>
    </Grid>
}