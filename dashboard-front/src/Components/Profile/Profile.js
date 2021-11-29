import React, {useEffect, useState} from 'react';
import {Avatar, Button, CircularProgress, Grid, IconButton, Tooltip} from "@mui/material";
import AlertError from "../Tools/AlertError";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DisplayDataUser from "./DisplayDataUser";
import {LoadingButton} from "@mui/lab";
import EditDataUser from "./EditDataUser";

export default function Profile() {
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (isEdit)
            return
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/userData`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setData(response.data);
                setEdit(response.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [isEdit])

    if (isLoading || !data)
        return <Grid container item xs={12} style={{height: '100%'}} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    const onSubmit = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setIsSaveLoading(true)
                await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/user/edit`, edit, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setIsSaveLoading(false)
                setIsEdit(false)
            } catch (err) {
                if (err.response) {
                    setIsSaveLoading(false)
                    setIsError(true);
                }
            }
        })()
    }

    return <Grid container item xs={12} component={'form'} onSubmit={onSubmit}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <Grid container item xs={12} justifyContent={'center'}>
            <Grid container item xs={12} style={{height: 150, background: 'lightgray'}}/>
            <Grid container item xs={10} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Avatar alt={data.name} src={data.avatar}
                        style={{height: 150, width: 150, border: '8px solid white', top: -75, position: 'relative'}}/>
                {isEdit ? <Grid container item xs={2} justifyContent={'space-around'} style={{marginTop: 20}}>
                    <Button onClick={() => {
                        setEdit(data)
                        setIsEdit(false)
                    }} variant={'contained'} color={'secondary'}>
                        Cancel
                    </Button>
                    <LoadingButton loading={isSaveLoading} type='submit' variant={'contained'} color={'primary'}>
                        Save
                    </LoadingButton>
                </Grid> : <Tooltip title={'Edit your profile page'}>
                    <IconButton onClick={() => setIsEdit(true)}>
                        <EditIcon fontSize={"large"}/>
                    </IconButton>
                </Tooltip>}
            </Grid>
            <Grid container item xs={12}>
                {isEdit ? <EditDataUser data={edit} setData={setEdit}/> : <DisplayDataUser data={data}/>}
            </Grid>
        </Grid>
    </Grid>
}