import React, {useEffect, useState} from 'react'
import {Chip, CircularProgress, Grid} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import axios from "axios";
import moment from "moment";
import AlertError from "../../../Tools/AlertError";
import CardPosts from "./CardPosts";
import {LoadingButton} from "@mui/lab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

export default function Posts({handleConnected}) {
    const [filter, setFilter] = useState(dataSearch[0].value);
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreData, setIsMoreData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [after, setAfter] = useState('');
    const [data, setData] = useState([]);

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
                        item.data.gallery_data.items.forEach(item => {
                            ref.push(item.media_id)
                        })
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
                        item.data.gallery_data.items.forEach(item => {
                            ref.push(item.media_id)
                        })
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

                    tab.push(body);
                })
                setData(tab);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem('JWTReddit')
                        handleConnected(false)
                    }
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
    }, [filter, handleConnected]);


    return <Grid container item xs={12} style={{height: '100%', display: 'block'}}>
        <AlertError isError={isError} setIsError={setIsError}/>
        <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'} style={{height: 40}}>
            {
                dataSearch.map((item, index) => <Chip disabled={isLoading || isMoreData}
                                                      onClick={() => setFilter(item.value)}
                                                      key={`${item.name} == ${index}`} icon={item.icon}
                                                      label={item.label}/>)
            }
        </Grid>
        <Grid container item xs={12} style={{height: 'calc(100% - 85px)', overflow: 'auto'}}>
            {isLoading ? <Grid container item xs={12} justifyContent={'center'}
                               alignItems={'center'}>
                <CircularProgress/>
            </Grid> : <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'}>
                {data.map((item, index) => <Grid key={`Posts = ${item.id} + ${item.author} + ${index}`} item xs={12}>
                    <CardPosts data={item} key={`Posts = ${item.id} + ${item.author} + ${item.title}`}/>
                </Grid>)}
            </Grid>}

            {!isLoading &&
            <Grid container item xs={12} alignItems={'baseline'} justifyContent={'center'}>
                <LoadingButton size={'small'} loading={isMoreData} color={'primary'} onClick={() => getDataFromReddit()}
                               endIcon={<KeyboardArrowDownIcon/>}>
                    More reddit posts
                </LoadingButton>
            </Grid>}
        </Grid>
    </Grid>
}