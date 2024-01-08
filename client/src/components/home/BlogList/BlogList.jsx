import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect, useState} from "react";
import Heading from "../Products/Heading";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [publicPath, setPublicPath] = useState("");

    // Get data carts
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.blogs);
                setBlogs(data.blogs);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs-publicPath', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="w-full pb-20">
            <Heading heading="Blogs"/>
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://cafefcdn.com/zoom/370_232/203337114487263232/2024/1/7/avatar1681742388755-1681742389211274595413-170461164042661524152.png"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body10" color="text.secondary">
                            {blogs.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>

                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://cafefcdn.com/zoom/370_232/203337114487263232/2024/1/7/avatar1681742388755-1681742389211274595413-170461164042661524152.png"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body10" color="text.secondary">
                            {blogs.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>


                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://cafefcdn.com/zoom/370_232/203337114487263232/2024/1/7/avatar1681742388755-1681742389211274595413-170461164042661524152.png"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body10" color="text.secondary">
                            {blogs.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>


                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://cafefcdn.com/zoom/370_232/203337114487263232/2024/1/7/avatar1681742388755-1681742389211274595413-170461164042661524152.png"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body10" color="text.secondary">
                            {blogs.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

export default BlogList;