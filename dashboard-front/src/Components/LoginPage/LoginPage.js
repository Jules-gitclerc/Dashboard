import React, {useEffect, useState} from "react";
import {
    Avatar, CircularProgress,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import {LoadingButton} from "@mui/lab";
import AlertError from "../Tools/AlertError";
import { GoogleLogin } from 'react-google-login';

export default function LoginPage({handleTriggerConnected}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isBigLoading, setIsBigLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const responseGoogle = (response) => {
        console.log(response);
        (async () => {
            await loginInSerer('google', response.profileObj.name, response.profileObj.googleId, response.profileObj.email)
        })()
    }

    useEffect(() => {
        (async () => {
            try {
                setIsBigLoading(true);
                await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/google/O-Auth`);
                setIsBigLoading(false);
            } catch (err) {
                alert('Server not connected')
            }
        })()
    }, [])

    async function loginInSerer(type, name, pass, email) {
        let body = {
            username: name,
            password: pass,
            email: email,
            auth: type,
        }
        try {
            setIsLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/login`, body);
            if (response.data.error) {
                setIsError(true);
            } else {
                localStorage.setItem('token', response.data.access_token);
                handleTriggerConnected(true);
            }
            setIsLoading(false)
        } catch (err) {
            if (err.response) {
                setIsLoading(false);
                setIsError(true);
            }
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await loginInSerer('local', username, password, 'google');
    }

    if (isBigLoading)
        return <Grid container item xs={12} style={{height: '100vh'}} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container component="main" sx={{height: '100vh'}}>
        <AlertError setIsError={setIsError} isError={isError}/>
        <CssBaseline/>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid container onSubmit={onSubmit} item xs={12} sm={8} md={5} component={'form'} elevation={6} sx={{height: '100%', padding: 5}}
              justifyContent={'center'} alignItems={'center'} direction={'column'}>
            <Avatar alt={'yoda'} src={'/Images/yodapetit.png'} style={{height: 90, width: 232}} />
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                autoComplete="username"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <GoogleLogin
                clientId={"329571686461-943drjr484p364gtu6q1u5k5l9jof4br.apps.googleusercontent.com"}
                buttonText="Sign in"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
            >
                Sign In
            </LoadingButton>
            <Link href="/createAccount" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
        </Grid>
    </Grid>
}