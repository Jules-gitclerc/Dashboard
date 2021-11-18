import React, {Suspense} from "react";
import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {CircularProgress, Grid} from "@mui/material";

const Profile = React.lazy(() => import('../Profile/Profile'));
const Diagram = React.lazy(() => import('./Diagram/Diagram'));

export default function Routes({items, setItems}) {
    const {url} = useRouteMatch()

    return <Suspense fallback={<Grid container justifyContent={"center"} alignItems={"center"}
                                     style={{top: 0, left: 0, height: "100vh", width: '100vw', position: "absolute"}}>
        <CircularProgress/>
    </Grid>}>
        <Route path={`${url}/Profile`}>
            <Profile/>
        </Route>
        <Route exact path={`${url}/`}>
            <Diagram items={items} setItems={setItems} />
        </Route>
    </Suspense>
}