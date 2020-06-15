import axios from 'axios';
import { FETCH_TOP_POSTS, FETCH_POSTS_ERROR } from './actionsType';

const url = `https://hacker-news.firebaseio.com/v0/item/23489068.json`;
const usr = ` https://hacker-news.firebaseio.com/v0/user/jl.json`;

const fetchError = () => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: 'Oops! Something went wrong. Please try again later;',
  };
};

export const fetchPostIDs = (type = 'topstories') => {
  return async (dispatch) => {
    try {
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
