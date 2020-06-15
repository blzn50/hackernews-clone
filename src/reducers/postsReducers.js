import { FETCH_TOP_POSTS } from '../actions/actionsType';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_POSTS:
      return [...state, action.payload];
      break;
    default:
      return state;
      break;
  }
};
