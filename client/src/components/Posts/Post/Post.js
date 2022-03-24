import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAlt";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("jwttest"));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === userId) ? (
  //       <>
  //         <ThumbUpAltIcon fontSize='small' />
  //         &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
  //       </>
  //     ) : (
  //       <>
  //         <ThumbUpAltOutlined fontSize='small' />
  //         &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       <ThumbUpAltOutlined fontSize='small' />
  //       &nbsp;Like
  //     </>
  //   );
  // };

  //使用useState来加速点击like后的页面反馈
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <Favorite fontSize='small' />
          &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorder fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorder fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        {/* cardmedia内增加 component='img', 否则会有warning提示 */}
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component='img' />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              styles={{ color: "white" }}
              size='small'
              onClick={(e) => {
                e.stopPropagation(); //由于这个button是嵌套在buttonbase下面的，因此该按钮需要防止向父级传播
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize='medium'></MoreHorizIcon>
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          // onClick={() => {
          //   dispatch(likePost(post._id));
          // }}
          onClick={handleLike}
          disabled={!user?.result}
        >
          {/* <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like {post.likeCount} */}
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='primary'
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize='small' />
            &nbsp; Del
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
