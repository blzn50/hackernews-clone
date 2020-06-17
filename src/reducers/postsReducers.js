import { FETCH_TOP_POSTS, FETCH_POSTS, FETCH_LOADING } from '../actions/actionsType';

const initialState = {
  postIDs: [],
  posts: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TOP_POSTS:
      return Object.assign({}, state, {
        postIDs: action.payload,
      });
    case FETCH_POSTS:
      return Object.assign({}, state, {
        posts: action.payload,
        loading: false,
      });
    default:
      return state;
  }
};
