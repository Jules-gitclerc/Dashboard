import React, {useEffect, useState} from "react";
import MenuDrawer from "./MenuDrawer";
import makeStyles from '@mui/styles/makeStyles';
import MenuAppBar from "./MenuAppBar";
import Routes from "./Routes";
import {CircularProgress, createTheme} from "@mui/material"; /*adaptV4Theme*/
import axios from "axios";
import {ThemeProvider} from "@emotion/react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        marginTop: 64,
        height: "calc(100vh - 64px)",
        overflow: 'hidden',
    },

}))

export default function DashBoard({handleTriggerConnected}) {
    const [theme, setTheme] = useState(createTheme({
        palette: {
            mode: 'dark',
        }
    }))
    const [userData, setUserData] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/userData`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                console.log(response.data)
                setUserData(response.data);
                setTheme(createTheme({
                    palette: {
                        mode: 'light',
                    }
                }))
                setIsLoading(false)
            } catch (err) {
                handleTriggerConnected(false);
                if (err.response) {
                    setIsLoading(false);
                }
            }
        })()
    }, [handleTriggerConnected])

    if (isLoading || userData === null)
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            <CircularProgress/>
        </div>

    if (!userData.isIdentified)
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            Your are not identified please check your mail, in {userData.email}
        </div>

    const handleNewItem = (model) => {
        setItems([...items, model]);
    }

    return <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <MenuAppBar userData={userData}/>
            <MenuDrawer items={items} handleNewItem={handleNewItem} userData={userData}/>
            <div className={classes.content}>
                <Routes items={items} setItems={setItems}/>
            </div>
        </div>
    </ThemeProvider>
}