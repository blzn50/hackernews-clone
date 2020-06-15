import { FETCH_TOP_POSTS } from '../actions/actionsType';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_POSTS:
      return Object.assign({}, state, {
        posts: action.payload,
      });
    default:
      return state;
  }
};
