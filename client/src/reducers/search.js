import { Types } from '../actions/search';
import arrayToObject from '../utils/arrayToObject';

const INITIAL_STATE = {
  results: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const {type,payload} = action
  switch (type) {
    case Types.SEARCH_NEARBY_USERS_REQUEST:
    case Types.SEARCH_TERM_REQUEST:
      return { loading:true }
    case Types.SEARCH_TERM_SUCCESS: 
    case Types.SEARCH_NEARBY_USERS_SUCCESS: {
      return {
        ...state,
        results: payload,
        loading: false
      }
    }
    default:
      return state;
  }
};
