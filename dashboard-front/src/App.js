import './App.css';
import {Redirect, Route} from 'react-router-dom';
import React, {Suspense, useEffect, useState} from "react";
import createGenerateClassName from '@mui/styles/createGenerateClassName';
import StylesProvider from '@mui/styles/StylesProvider';
import {CircularProgress, Grid} from "@mui/material";
import LoginPage from "./Components/LoginPage/LoginPage";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import Identification from "./Components/Identification/Identification";
import RedditApi from "./Components/RedditApi/RedditApi";

const DashBoard = React.lazy(() => import('./Components/DashBoard/DashBoard'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'Yodash',
    seed: 'YD'
});

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleTriggerConnected = (isLogged) => {
        setIsConnected(isLogged);
    }

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token'))
                try {
                    //let response = await axios.get(`${process.env.REACT_APP_KEYBOON_API}/auth/isConnected?appVersion=${appVersion}&app=keyboon`, {'headers': {'Authorization': `Bearer  ${process.env.REACT_APP_BEARER || localStorage.getItem('JWT')}`}})
                    setIsConnected(true)
                    //setUserData(response.data)

                } catch (err) {
                    setIsConnected(false)
                    //setUserData(undefined)
                }
            else {
                setIsConnected(false)
                //setUserData(undefined)
            }
        })()
    }, []);

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Suspense fallback={
                <Grid container justifyContent={"center"} alignItems={"center"}
                      style={{top: 0, left: 0, height: "100vh", width: '100vw', position: "absolute"}}>
                    <CircularProgress/>
                </Grid>}>
                <Route exact path={"/redditApi"}>
                    <RedditApi/>
                </Route>
                <Route exact path={"/identification/:idUser/:username"}>
                    <Identification/>
                </Route>
                <Route exact path={"/"}>
                    {isConnected ? <Redirect to={'/App'}/> :
                        <LoginPage handleTriggerConnected={handleTriggerConnected}/>}
                </Route>
                <Route exact path={"/login"}>
                    {isConnected ? <Redirect to={'/App'}/> :
                        <LoginPage handleTriggerConnected={handleTriggerConnected}/>}
                </Route>
                <Route exact path={"/createAccount"}>
                    {isConnected ? <Redirect to={'/App'}/> :
                        <CreateAccount handleTriggerConnected={handleTriggerConnected}/>}
                </Route>
                <Route path={"/App"}>
                    {isConnected === false ? <Redirect to={'/login'}/> : <></>}
                    <DashBoard handleTriggerConnected={handleTriggerConnected}/>
                </Route>
            </Suspense>
        </StylesProvider>
    );
}

export default App;