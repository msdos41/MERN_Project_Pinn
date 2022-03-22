import * as api from "../api";
import { FETCH_ALL, FETCH_POST, CREATE, DELETE, UPDATE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING ,COMMENT} from "../constants/actionTypes";

//Action Creators
// export const getPosts = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchPosts();

//     dispatch({
//       type: FETCH_ALL,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    console.log("getposts", data);
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
    //console.log(data);
    dispatch({
      type: FETCH_POST,
      payload: data,
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      //data: { data }
      data,
    } = await api.fetchPostsBySearch(searchQuery);
    console.log("getPostsBySearch", data);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

    //navigate(`/posts/${data._id}`);

    dispatch({
      type: CREATE,
      payload: data,
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error); //不要输出error.message,直接输出error
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    console.log("comment:", data);
    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
