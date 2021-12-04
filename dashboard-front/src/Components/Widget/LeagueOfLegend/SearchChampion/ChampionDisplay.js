import React, {useState} from 'react'
import {CircularProgress, Grid, Paper, Popover, Typography} from "@mui/material";

export default function ChampionDisplay({data, isLoading}) {
    const [spellSelected, setSpellSelected] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading || !data)
        return <Grid container item xs={12} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container item xs={12} style={{height: 'calc(100% - 120px)'}}>
        <Grid container item xs={3} style={{height: '100%'}}>
            <Grid container item xs={12} style={{height: 'calc(100% - 30px)'}} justifyContent={'center'}>
                <img alt={data.name}
                     src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.id}_0.jpg`}
                     style={{height: '100%', width: 'auto'}}/>
            </Grid>
            <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: 15}}>
                <Typography>
                    {data.name}
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={9} style={{height: '100%'}}>

            <Grid item xs={12} justifyContent={'center'} alignItems={'center'}>
                <Typography style={{fontSize: 11}}>
                    {data.lore}
                </Typography>
            </Grid>

            <Grid container item xs={12} justifyContent={'space-around'}>
                {data.spells.map(item => <Grid key={item.id} style={{cursor: 'pointer'}} item xs={2} onClick={(e) => {setSpellSelected(item); handleClick(e)}}>
                    <img alt={item.name} src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${item.image.full}`} />
                </Grid>)}
            </Grid>

            <Grid container item xs={12} justifyContent={'space-around'} spacing={2} style={{padding: 10}}>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>HP</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.hp}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Move Speed</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.movespeed}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Armor</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.armor}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Attack Damage</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.attackdamage}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Crit</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.crit}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Attack Speed</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.attackspeed}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper style={{width: '100%'}}>
                        <Grid item xs={12}>
                            <Typography>Mp</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.stats.mp}</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>

        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div style={{width: 250}}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        {spellSelected ? <Typography>{spellSelected.description}</Typography> : null}
                    </Grid>
                </Grid>
            </div>
        </Popover>


    </Grid>

}