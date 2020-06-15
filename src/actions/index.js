import { FETCH_TOP_POSTS } from './actionsType';

export const fetchTopPosts = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_TOP_POSTS,
      payload: 'result',
    });
  };
};
