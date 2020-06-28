import {
  FETCH_TOP_POSTS,
  FETCH_POSTS,
  FETCH_LOADING,
  FETCH_POSTS_ERROR,
  FETCH_ADDITIONAL_POSTS,
  FETCH_ADDITIONAL_POSTS_LOADING,
  FETCH_END,
  FETCH_SINGLE_POST,
} from '../actions/actionsType';

const initialState = {
  postIDs: [],
  posts: [],
  loading: false,
  error: '',
  miniLoading: false,
  endOfPage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      console.log('in reducer');
      return {
        ...state,
        loading: true,
        endOfPage: false,
      };

    case FETCH_ADDITIONAL_POSTS_LOADING:
      return {
        ...state,
        miniLoading: true,
        endOfPage: false,
      };

    case FETCH_END:
      return {
        ...state,
        miniLoading: false,
        endOfPage: true,
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

    case FETCH_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case FETCH_ADDITIONAL_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case FETCH_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
