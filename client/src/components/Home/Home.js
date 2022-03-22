import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  //console.log("page",page);
  const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleSearchPost = () => {
    if (search.trim() || tags.length) {
      // dispatch -> fetch search post
      console.log("search.trim:", search.trim());
      console.log("tags:", tags);

      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      console.log("search.trim:", search.trim());
      console.log("tags:", tags);
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search posts
      handleSearchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container={true} justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></TextField>
              <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined'></ChipInput>
              <Button className={classes.searchButton} onClick={handleSearchPost} variant='contained' color='primary'>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* 当没有任何搜索项时，才显示分页，也就是搜索状态下不显示分页 */}
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page}></Pagination>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
