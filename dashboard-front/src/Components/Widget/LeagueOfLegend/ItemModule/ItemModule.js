import React, {useEffect, useState} from 'react';
import {Grid, ListItemButton, ListItemText, List, ListItemAvatar} from "@mui/material";
import axios from "axios";
import AlertError from "../../../Tools/AlertError";
import Filter from "./Filter/Filter";
import AutocompleteChampion from "../SearchChampion/Filter/AutocompleteChampion";
import DisplayInventoryStat from "./DisplayInventoryStat";

export default function ItemModule() {
    const [dataItem, setDataItem] = useState([]);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedChampion, setSelectedChampion] = useState(null);
    const [selectItem, setSelectedItem] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/leagueOfLegend/item`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setDataItem(response.data);
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
        })()
    }, [])

    const handleDeleteItem = (id) => {
        const index = selectItem.findIndex(elem => elem.id === id);
        selectItem.splice(index, 1);
        setSelectedItem([...selectItem])
    }

    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Filter dataItem={dataItem} setFilter={setFilter} setSearch={setSearch}/>
        <Grid container item xs={12} style={{height: 'calc(100% - 125px)'}}>
            <Grid container item xs={5} style={{height: '100%', overflow: 'auto'}}>
                <List dense>
                    {dataItem.map(item => {
                        if (filter.length === 0) {
                            if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                return <ListItemButton disabled={selectItem.length === 6} key={item.id} onClick={() => {
                                    if (selectItem.length < 6) {
                                        selectItem.push(item)
                                        setSelectedItem([...selectItem])
                                    }
                                }}>
                                    <ListItemAvatar>
                                        <img alt={item.name}
                                             src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item.image.full}`}
                                             style={{height: 40, width: 'auto'}}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${item.name} - cost: ${item.gold.total} 💸`}
                                                  secondary={item.description}/>
                                </ListItemButton>
                            else
                                return null;
                        }
                        for (let i in item.tags) {
                            if (filter.find(p => p === item.tags[i])) {
                                if (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                    return <ListItemButton disabled={selectItem.length === 6} key={item.id}
                                                           onClick={() => {
                                                               if (selectItem.length < 6) {
                                                                   selectItem.push(item)
                                                                   setSelectedItem([...selectItem])
                                                               }
                                                           }}>
                                        <ListItemAvatar>
                                            <img alt={item.name}
                                                 src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item.image.full}`}
                                                 style={{height: 40, width: 'auto'}}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${item.name} - cost: ${item.gold.total} 💸`}
                                                      secondary={item.description}/>
                                    </ListItemButton>
                                else
                                    return null;
                            }
                        }
                        return null;
                    })}
                </List>
            </Grid>
            <Grid container item xs={7} style={{height: '100%', display: 'block'}}>
                <Grid item xs={12} style={{padding: '0px 10px 10px 10px'}}>
                    <AutocompleteChampion value={selectedChampion} handleChange={setSelectedChampion}/>
                </Grid>
                <DisplayInventoryStat dataItem={selectItem} dataChampion={selectedChampion}
                                      handleDeleteItem={handleDeleteItem}/>
            </Grid>
        </Grid>
    </Grid>

}