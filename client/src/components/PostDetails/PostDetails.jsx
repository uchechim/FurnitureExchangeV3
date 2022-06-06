import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useHistory} from "react-router-dom";
import moment from "moment";

import { getPost } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id} = useParams();

    useEffect(()=> {
        dispatch(getPost(id));
    }, [id]);

    if(!post) return null;

    if(isLoading){
        return( 
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em"/>
            </Paper>
        );
    };
    
    return (
        
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
      </div>
    )
};

export default PostDetails;