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
  CLOSE_EOP_SNACKBAR,
} from './actionsType';

// const url = `https://hacker-news.firebaseio.com/v0/item/23489068.json`;
// const usr = ` https://hacker-news.firebaseio.com/v0/user/jl.json`;

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

export const endEOP = () => {
  return {
    type: CLOSE_EOP_SNACKBAR,
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
        // payload: postIDs.data.slice(0, 30),
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

export const fetchSinglePost = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(FETCH_LOADING));
      const post = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      if (post.data.kids) {
        const comments = await fetchComments(post.data.kids);
        post.data.kids = comments;
      }

      dispatch({
        type: FETCH_SINGLE_POST,
        payload: post.data,
      });
    } catch (er) {
      dispatch(fetchError());
    }
  };
};

const fetchComments = async (idArr) => {
  let commentsArr = [];
  const actualRecursiveFetchComments = async (ids) => {
    return await ids.reduce(async (resultArr, id) => {
      try {
        const post = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (post.data.dead) {
          post.data.text = '[flagged]';
        }

        if (post.data.kids) {
          const inner = await actualRecursiveFetchComments(post.data.kids);
          post.data.kids = inner;
        }

        if (!post.data.deleted) {
          const res = await resultArr;
          res.push(post.data);
        }

        return resultArr;
      } catch (error) {
        console.log(error);
      }
    }, Promise.resolve([]));
  };

  await Promise.all(await actualRecursiveFetchComments(idArr).then((res) => (commentsArr = res)));
  return commentsArr;
};
