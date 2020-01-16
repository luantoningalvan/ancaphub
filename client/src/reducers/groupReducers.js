import types from '../actions/_types'
const INITIAL_STATE = { allGroups: [], authGroups: [], group: {}, loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GROUPS_IS_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_PUBLIC_GROUPS_SUCCESS:
      return { 
        ...state, 
        allGroups: action.payload, 
        loading: false 
      };
    case types.FETCH_AUTH_GROUPS_SUCCESS:
      return { 
        ...state, 
        authGroups: action.payload, 
        loading: false 
      };
    case types.CREATE_GROUP_SUCCESS: 
      window.location.href = `${process.env.REACT_APP_BASE_URL}/groups/${action.payload._id}`
      break
    case types.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        group: action.payload,
        loading: false
      }
    case types.FETCH_PUBLIC_GROUPS_FAILURE:
    case types.FETCH_AUTH_GROUPS_FAILURE:
    case types.FETCH_GROUP_FAILURE:
    case types.CREATE_GROUP_FAILURE:
        return {
          ...state,
          loading: false
        }
    default:
      return state
  }
};




