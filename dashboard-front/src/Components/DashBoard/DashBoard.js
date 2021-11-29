import React, {useEffect, useState} from "react";
import MenuDrawer, {drawerWidth} from "./MenuDrawer";
import makeStyles from '@mui/styles/makeStyles';
import MenuAppBar from "./MenuAppBar";
import Routes from "./Routes";
import {CircularProgress, createTheme} from "@mui/material";
import axios from "axios";
import {ThemeProvider} from "@emotion/react";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        marginTop: 64,
        height: "calc(100vh - 64px)",
        overflow: 'hidden',
        marginLeft: -drawerWidth,
    },
    contentShift: {
        width: "100%",
        height: "calc(100vh - 64px)",
        marginLeft: 0,
    },

}))

export default function DashBoard({handleTriggerConnected}) {
    const [theme, setTheme] = useState(createTheme({
        palette: {
            mode: 'dark',
        }
    }))
    const [userData, setUserData] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        if (!isReload)
            return;
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/userData`,
                    {'headers': {'Authorization': `Bearer  ${localStorage.getItem('token')}`}})
                setUserData(response.data);
                setTheme(createTheme({
                    palette: {
                        mode: 'light',
                    }
                }))
                setIsLoading(false)
                setIsReload(false)
            } catch (err) {
                handleTriggerConnected(false);
                if (err.response) {
                    setIsLoading(false);
                    setIsReload(false)
                }
            }
        })()
    }, [handleTriggerConnected, isReload])

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

    const handleDrawer = (open) => {
        setDrawerOpen(open)
    }

    const hotReload = (isToReload) => {
        setIsReload(isToReload)
    }

    const handleThemeChange = (primary, secondary) => {
        console.log("je suis la");
        setTheme(createTheme({
            palette: {
                primary: {
                    main: primary,
                },
                secondary: {
                    main: secondary,
                },
            },
        }))
    }

    return <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <MenuAppBar userData={userData} drawerOpen={drawerOpen} handleDrawer={handleDrawer} handleThemeChange={handleThemeChange}/>
            <MenuDrawer items={items} handleNewItem={handleNewItem} userData={userData} drawerOpen={drawerOpen} handleDrawer={handleDrawer} hotReload={hotReload}/>
            <div className={clsx(classes.content, {
                [classes.contentShift]: drawerOpen,
            })}>
                <Routes items={items} setItems={setItems}/>
            </div>
        </div>
    </ThemeProvider>
}