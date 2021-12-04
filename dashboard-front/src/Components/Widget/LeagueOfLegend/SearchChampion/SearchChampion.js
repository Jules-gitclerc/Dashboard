import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import AlertError from "../../../Tools/AlertError";
import axios from "axios";
import ChampionDisplay from "./ChampionDisplay";
import Filter from "./Filter/Filter";

export default function SearchChampion() {
    const [select, setSelect] = useState(null);
    //const [type, setType] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!select)
            return;
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion/${select.id}.json`);
                setData(response.data.data[select.id])
                setIsLoading(false)
            } catch (err) {
                setIsError(true)
            }
        })()
    }, [select]);

    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <Filter selected={select} setSelected={setSelect}/>
        {select ? <ChampionDisplay data={data} isLoading={isLoading}/> : <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: 'calc(100% - 120px)'}}>
            Select one champion for see description
        </Grid>}
    </Grid>
}