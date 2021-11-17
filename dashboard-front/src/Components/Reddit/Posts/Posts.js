import React, {useEffect, useState} from "react";
import {Chip, CircularProgress, Grid, Paper} from "@mui/material";
import AlertError from "../../Tools/AlertError";
import axios from "axios";
import CardPosts from "./CardPosts";
import moment from "moment";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {LoadingButton} from "@mui/lab";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

let dataSearch = [
    {
        label: 'Hot',
        value: '/hot',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Best',
        value: '/best',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Rising',
        value: '/rising',
        icon: <LocalFireDepartmentIcon/>
    },
    {
        label: 'Top',
        value: '/top',
        icon: <LocalFireDepartmentIcon/>
    },
]

export default function Posts() {
    const [filter, setFilter] = useState(dataSearch[0].value);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [after, setAfter] = useState('')
    const [isMoreData, setIsMoreData] = useState(false);

    function getDataFromReddit() {
        (async () => {
            try {
                setIsMoreData(true);
                const response = await axios.get(`https://oauth.reddit.com${filter}?g=GLOBAL&limit=10&sr_detail=true&after=${after}`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                setAfter(response.data.data.after);
                response.data.data.children.forEach(item => {
                    let body = {
                        subReddit: {
                            name: item.data.subreddit,
                            prefixName: item.data.subreddit_name_prefixed,
                            url: item.data.url,
                            avatar: item.data.sr_detail.icon_img,
                        },
                        author: item.data.author,
                        score: item.data.score,
                        id: item.data.name,
                        media: null,
                        title: item.data.title,
                        text: item.data.selftext,
                        isVideo: item.data.is_video,
                        isGallery: false,
                        date: moment(item.data.created_utc).format("MMMM Do YYYY, h:mm:ss a"),
                    }

                    if (body.isVideo) {
                        body.media = item.data.secure_media.reddit_video.fallback_url
                    } else if (item.data.gallery_data) {
                        let ref = []
                        let dataGallery = []

                        body.isGallery = true
                        item.data.gallery_data.items.forEach(item => {ref.push(item.media_id)})
                        if (ref.length > 0) {
                            for (let elem in ref) {
                                let img = item.data.media_metadata[ref[elem]].s.u

                                dataGallery.push(img.replaceAll("amp;", ""))
                            }
                            body.media = dataGallery
                        } else {
                            body.media = null
                        }
                    } else {
                        if (item.data.preview)
                            body.media = item.data.preview.images[0].source.url.replaceAll("amp;", "")
                    }

                    data.push(body);
                })
                setData([...data]);
                setIsMoreData(false);
            } catch (err) {
                console.log(err)
                if (err.response) {
                    setIsMoreData(false);
                    setIsError(true);
                }
            }
        })()
    }


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://oauth.reddit.com${filter}?g=GLOBAL&limit=10&sr_detail=true&after=${after}`, {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWTReddit')}`}});
                setAfter(response.data.data.after);
                console.log(response.data)


                let tab = []
                response.data.data.children.forEach(item => {
                    let body = {
                        subReddit: {
                            name: item.data.subreddit,
                            prefixName: item.data.subreddit_name_prefixed,
                            url: item.data.url,
                            avatar: item.data.sr_detail.icon_img,
                        },
                        author: item.data.author,
                        score: item.data.score,
                        id: item.data.name,
                        media: null,
                        title: item.data.title,
                        text: item.data.selftext,
                        isVideo: item.data.is_video,
                        isGallery: false,
                        date: moment(item.data.created_utc).format("MMMM Do YYYY, h:mm:ss a"),
                    }

                    if (body.isVideo) {
                        body.media = item.data.secure_media.reddit_video.fallback_url
                    } else if (item.data.gallery_data && item.data.media_metadata) {
                        let ref = []
                        let dataGallery = []

                        body.isGallery = true
                        item.data.gallery_data.items.forEach(item => {ref.push(item.media_id)})
                        if (ref.length > 0) {
                            for (let elem in ref) {

                                //console.log(item.data.media_metadata)
                                let img = item.data.media_metadata[ref[elem]].s.u

                                dataGallery.push(img.replaceAll("amp;", ""))
                            }
                            body.media = dataGallery
                        } else {
                            body.media = null
                        }
                    } else {
                        if (item.data.preview)
                            body.media = item.data.preview.images[0].source.url.replaceAll("amp;", "")
                    }

                    tab.push(body);
                })
                setData(tab);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [filter])

    return <Grid container item xs={12} style={{height: '100%'}} justifyContent={'center'}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Paper elevation={6} style={{
            width: '100%',
            height: '68px',
            marginBottom: 30,
            borderRadius: 0,
            position: 'sticky',
            top: 0,
            zIndex: 9
        }}>
            <Grid container item xs={12} sm={12} md={5} style={{height: '100%'}} alignItems={'center'}
                  justifyContent={'space-around'}>
                {
                    dataSearch.map((item, index) => <Chip disabled={isLoading || isMoreData} onClick={() => setFilter(item.value)}
                                                          key={`${item.name} == ${index}`} icon={item.icon}
                                                          label={item.label}/>)
                }
            </Grid>
        </Paper>
        {isLoading ? <Grid container item xs={12} style={{height: 'calc(100% - 68px)'}} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress/>
        </Grid> : <Grid container item xs={12} style={{height: 'calc(100% - 68px)', overflow: 'auto'}} justifyContent={'center'}>

            {data.map((item, index) => <Grid key={`Posts = ${item.id} + ${item.author} + ${index}`} item xs={12} sm={8} lg={8} md={7}>
                <CardPosts data={item} key={`Posts = ${item.id} + ${item.author} + ${item.title}`}/>
            </Grid>)}

            <Grid container item xs={12} style={{height: 100}} alignItems={'baseline'} justifyContent={'center'}>
                <LoadingButton size={'small'} loading={isMoreData} color={'primary'} onClick={() => getDataFromReddit()} endIcon={<KeyboardArrowDownIcon />}>
                    Next reddit posts
                </LoadingButton>
            </Grid>
        </Grid>}
    </Grid>
}