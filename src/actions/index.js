import axios from 'axios';
import {
  FETCH_TOP_POSTS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS,
  FETCH_SINGLE_POST,
  FETCH_LOADING,
  FETCH_ADDITIONAL_POSTS,
  FETCH_ADDITIONAL_POSTS_LOADING,
  FETCH_END,
} from './actionsType';

const url = `https://hacker-news.firebaseio.com/v0/item/23489068.json`;
const usr = ` https://hacker-news.firebaseio.com/v0/user/jl.json`;

const fetchError = () => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: 'Oops! Something went wrong. Please try again later!',
  };
};

const fetchLoading = (type) => {
  return {
    type,
  };
};

export const endFetchLoading = () => {
  return {
    type: FETCH_END,
  };
};

// fetch all ids
export const fetchPostIDs = (type = 'topstories') => {
  return async (dispatch) => {
    try {
      // dispatch(fetchLoading(FETCH_LOADING));
      const postIDs = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
      dispatch({
        type: FETCH_TOP_POSTS,
        payload: postIDs.data,
      });
    } catch (error) {
      dispatch(fetchError());
    }
  };
};

// fetch initial posts
export const fetchPosts = (ids) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(FETCH_LOADING));
      const posts = await Promise.all(
        ids.map(async (id) => {
          const p = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return p.data;
        })
      );
      console.log(posts);

      dispatch({
        type: FETCH_POSTS,
        payload: posts,
      });
    } catch (er) {
      console.log(er);
      dispatch(fetchError());
    }
  };
};

// fetch additional posts
export const fetchAdditionalPosts = (ids) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(FETCH_ADDITIONAL_POSTS_LOADING));
      const posts = await Promise.all(
        ids.map(async (id) => {
          const p = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return p.data;
        })
      );
      // console.log(posts);

      dispatch({
        type: FETCH_ADDITIONAL_POSTS,
        payload: posts,
      });
    } catch (er) {
      console.log(er);
      dispatch(fetchError());
    }
  };
};

/* 
export const fetchSinglePost = (id) => {
  return async dispatch => {
try{
const post = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
dispatch({
  type: FETCH_SINGLE_POST,
  payload: post.data
})
}catch(er){
  dispatch(fetchError())
}
  }
} */
