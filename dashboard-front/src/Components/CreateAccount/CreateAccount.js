import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Divider,
    Grid,
    Link,
    Paper,
    Switch,
    TextField,
    Typography,
    List,
    ListItem, ListItemIcon, ListItemText, FormControlLabel, Checkbox, CircularProgress
} from "@mui/material";
import axios from "axios";
import AlertError from "../Tools/AlertError";
import {LoadingButton} from "@mui/lab";
import PersonIcon from '@mui/icons-material/Person';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DataSend from "./DataSend";
import serviceConfig from "../Widget/config";
import {GoogleLogin} from "react-google-login";

/*
useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                request !!!!!!
                if (isMounted.current)
                    setData(response.data)
                setIsLoading(false)
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
        return () => {
            isMounted.current = false
            source.cancel("name got unmounted");
        };
    }, [isMounted, isReload])
 */

export default function CreateAccount({handleTriggerConnected}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [hidden, setHidden] = useState(true);
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [auth, setAuth] = useState('local');

    const [isSend, setIsSend] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isConfirmationPasswordCorrect, setIsConfirmationPasswordCorrect] = useState(false);
    const [services, setServices] = useState([]);

    const [isBigLoading, setIsBigLoading] = useState(false);
    const [googleClientId, setGoogleClientId] = useState('');

    useEffect(() => {
        let pages = []
        serviceConfig.forEach((elem) => {
            pages.push({
                name: elem.label,
                logoService: elem.logoService,
                id: elem.id,
                checked: true,
            })
        })
        setServices(pages);
        (async () => {
            try {
                setIsBigLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/google/O-Auth`);
                setGoogleClientId(response.data.googleClientId);
                setIsBigLoading(false);
            } catch (err) {
                alert('Server not connected')
            }
        })()
    }, [])

    const responseGoogle = (response) => {
        console.log(response);
        setAuth('google')
        setUsername(response.profileObj.name)
        setMail(response.profileObj.email)
        setLastName(response.profileObj.familyName)
        setFirstName(response.profileObj.givenName)
        setAvatar(response.profileObj.imageUrl)
        setPassword(response.profileObj.googleId)
        setConfirmationPassword(response.profileObj.googleId)
        setIsPasswordCorrect(true)
        setIsConfirmationPasswordCorrect(true)
        setPhone('00 00 00 00 00')
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!(isPasswordCorrect && isConfirmationPasswordCorrect)) {
            setIsError(true)
            return
        }
        (async () => {
            let body = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                mail: mail,
                avatar: avatar,
                auth: auth,
                phone: phone,
                services: services,
            }
            try {
                setIsLoading(true)
                const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/createAccount`, body);
                if (response.data.error) {
                    setIsError(true);
                } else {
                    localStorage.setItem('token', response.data.access_token);
                    setIsSend(true);
                }
                setIsLoading(false)
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length > 5)
            setIsPasswordCorrect(true)
        else
            setIsPasswordCorrect(false)
        if (e.target.value === confirmationPassword && e.target.value.length > 0 && isPasswordCorrect)
            setIsConfirmationPasswordCorrect(true)
        else
            setIsConfirmationPasswordCorrect(false)
    }

    const onConfirmationPasswordChange = (e) => {
        setConfirmationPassword(e.target.value)
        if (e.target.value === password && password.length > 0 && isPasswordCorrect)
            setIsConfirmationPasswordCorrect(true)
        else
            setIsConfirmationPasswordCorrect(false)
    }

    if (isBigLoading)
        return <Grid container item xs={12} style={{height: '100vh'}} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress/>
        </Grid>

    return <Grid container component={'form'} onSubmit={onSubmit} justifyContent={'center'}
                 sx={{height: '100vh', width: '100vw'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Grid
            item
            xs={false}
            sm={2}
            md={3}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        {isSend ? <DataSend handleTriggerConnected={handleTriggerConnected}/> :
            <Grid component={Paper} elevation={6} container item xs={12} sm={8} md={6}
                  style={{height: '100%', padding: 20, overflow: 'auto'}}>

                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                    <Avatar alt={'yoda'} src={'/Images/yodapetit.png'} style={{height: 90, width: 232}}/>
                    <Typography variant='h4'>
                        Sign Up
                    </Typography>
                </Grid>

                <Grid container item xs={12} style={{height: '410px'}} alignItems={'center'}>
                    <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'} style={{borderBottom: '1px solid lightgrey'}}>
                        <Grid item>
                            <List dense style={{padding: 0}}>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon fontSize={'large'}/>
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <React.Fragment>
                                            <Typography
                                                style={{fontWeight: 'bold'}}
                                            >
                                                User information
                                            </Typography>
                                        </React.Fragment>
                                    } secondary={
                                        <React.Fragment>
                                            <Typography
                                                variant="caption"
                                            >
                                                Set your user information
                                            </Typography>
                                        </React.Fragment>
                                    }/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item>
                            <GoogleLogin
                                clientId={googleClientId}
                                buttonText="Sign up with your google account"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Grid>
                    </Grid>


                    <Grid container item xs={12}>
                        <Grid container item xs={3} alignItems={'center'} justifyContent={'center'}>
                            <Avatar
                                alt={username}
                                src={avatar}
                                sx={{width: 110, height: 110}}
                            />
                        </Grid>
                        <Grid container item xs={9} alignItems={'center'} spacing={1}>
                            <Grid container item xs={12} justifyContent={'space-between'} spacing={2}>
                                <Grid item xs={6}>
                                    <TextField disabled={auth === 'google'} fullWidth required={true} label={'First Name'} value={firstName}
                                               onChange={(e) => setFirstName(e.target.value)}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField disabled={auth === 'google'} fullWidth required={true} label={'Last Name'} value={lastName}
                                               onChange={(e) => setLastName(e.target.value)}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField disabled={auth === 'google'} fullWidth required={true} label={'Username'} value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <TextField disabled={auth === 'google'} fullWidth required={true} type={hidden ? 'password' : 'text'} label={'Password'}
                                       value={password}
                                       onChange={onPasswordChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField disabled={auth === 'google'} fullWidth required={true} type={hidden ? 'password' : 'text'}
                                       label={'Confirmation Password'} value={confirmationPassword}
                                       onChange={onConfirmationPasswordChange}/>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} spacing={2} style={{padding: 0}}>
                        <Grid item xs={6} style={{paddingTop: 0}}>
                            <Paper elevation={2} style={{
                                background: isPasswordCorrect ? 'green' : 'red',
                                width: '100%',
                                color: 'red',
                                height: 5
                            }}/>

                        </Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>
                            <Paper elevation={2} style={{
                                background: isConfirmationPasswordCorrect ? 'green' : 'red',
                                width: '100%',
                                color: 'red',
                                height: 5
                            }}/>

                        </Grid>

                    </Grid>

                    <Grid container item xs={12}>
                        <FormControlLabel control={
                            <Checkbox disabled={auth === 'google'} checked={!hidden} onChange={() => setHidden(prevState => !prevState)}/>
                        } label="Show password"/>
                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={7}>
                            <TextField disabled={auth === 'google'} fullWidth required={true} label={'Mail'} value={mail}
                                       onChange={(e) => setMail(e.target.value)}/>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField disabled={auth === 'google'} fullWidth required={true} label={'Phone'} value={phone}
                                       onChange={(e) => setPhone(e.target.value)}/>
                        </Grid>
                    </Grid>

                </Grid>


                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <List dense style={{padding: 0}}>
                            <ListItem>
                                <ListItemIcon>
                                    <DesignServicesIcon fontSize={'large'}/>
                                </ListItemIcon>
                                <ListItemText primary={
                                    <React.Fragment>
                                        <Typography
                                            style={{fontWeight: 'bold'}}
                                        >
                                            Service
                                        </Typography>
                                    </React.Fragment>
                                } secondary={
                                    <React.Fragment>
                                        <Typography
                                            variant="caption"
                                        >
                                            Select your service
                                        </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                        </List>
                        <Divider/>
                    </Grid>

                    <Grid container item xs={12} style={{marginTop: 10, minHeight: 100}}>
                        {services.map((item, index) => <Grid key={`Services => ${item.id}`} item xs={12}>
                            <Paper elevation={2} style={{width: '100%', height: 50}}>
                                <Grid container item xs={12} style={{height: '100%', padding: 10}} alignItems={'center'}
                                      justifyContent={'space-between'}>
                                    <Grid container item xs={4} alignItems={'center'} spacing={2}>
                                        <Grid item>
                                            <img alt={item.name} src={item.logoService} style={{width: 30, height: 'auto'}}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h6'>
                                                {item.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent={'flex-end'}>
                                        <Switch checked={item.checked} onChange={() => {
                                            services[index].checked = !services[index].checked;
                                            setServices([...services]);
                                        }}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>)}
                    </Grid>
                </Grid>


                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: 80}}>
                    <LoadingButton fullWidth variant={'contained'} type={'submit'} loading={isLoading}>
                        Sign Up
                    </LoadingButton>
                    <Link href="/login" variant="body2">
                        {"You have an account? Sign In"}
                    </Link>
                </Grid>
            </Grid>}


        <Grid
            item
            xs={false}
            sm={2}
            md={3}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    </Grid>
}