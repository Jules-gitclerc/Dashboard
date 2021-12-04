import React, {useEffect, useState} from 'react';
import {
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Filter({dataItem, setFilter, setSearch}) {
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [fSearch, setFSearch] = useState('');

    useEffect(() => {
        let obj = [];

        dataItem.forEach(item => {
            item.tags.forEach(elem => {
                if (!obj.find(i => i === elem))
                    obj.push(elem)
            })
        })

        setData(obj);
    }, [dataItem])

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
        setFilter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return <Grid container item xs={12} style={{padding: 10, height: 75}}>
        <Grid item xs={6} style={{paddingRight: 5}}>
            <FormControl sx={{width: '100%'}}>
                <InputLabel>Tags</InputLabel>
                <Select
                    multiple
                    value={tags}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tags"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {data.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={tags.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} style={{paddingLeft: 5}}>
            <TextField label={'Search'} type={'search'} variant={'outlined'} value={fSearch} onChange={(e) => {
                setFSearch(e.target.value);
                setSearch(e.target.value)
            }} fullWidth/>
        </Grid>
    </Grid>
}