import { FETCH_TOP_POSTS, FETCH_POSTS } from '../actions/actionsType';

const initialState = {
  postIDs: [],
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_POSTS:
      return Object.assign({}, state, {
        postIDs: action.payload,
      });
    case FETCH_POSTS:
      return Object.assign({}, state, {
        posts: action.payload,
      });
    default:
      return state;
  }
};
