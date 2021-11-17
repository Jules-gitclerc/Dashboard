import React, {Suspense} from "react";
import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {CircularProgress, Grid} from "@mui/material";

/*
<Route exact path={`${url}/`}
                   render={() => <Redirect to={defaultRoute}/>}/> //todo reworking
 */

const Profile = React.lazy(() => import('../Profile/Profile'));
const Reddit = React.lazy(() => import('../Reddit/Reddit'));

export default function Routes() {
    const {url} = useRouteMatch()

    return <Suspense fallback={<Grid container justifyContent={"center"} alignItems={"center"}
                                     style={{top: 0, left: 0, height: "100vh", width: '100vw', position: "absolute"}}>
        <CircularProgress/>
    </Grid>}>
        <Route path={`${url}/Profile`}>
            <Profile/>
        </Route>
        <Route path={`${url}/Reddit`}>
            <Reddit/>
        </Route>
    </Suspense>
}