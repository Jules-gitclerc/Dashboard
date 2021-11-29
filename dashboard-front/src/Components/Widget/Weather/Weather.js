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
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=0144563c0b4b1a1065fde914246dbb87`); //todo api key get from back
            setData(response.data)
            setIsLoading(false)
        } catch (err) {
            if (err.response) {
                setIsLoading(false)
                setIsError(true)
            }
        }
    }

    return <Grid container item xs={12}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <CountryFilter handleFilter={handleFilter}/>
        <WeatherSearchDisplay data={data} isLoading={isLoading}/>
    </Grid>
}