const INITIAL_STATE = { allGroups: [], authGroups: [], group: null, isLoading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_PUBLIC_GROUPS":
      return { ...state, allGroups: action.payload, isLoading: false };
    case "FETCH_ALL_AUTH_GROUPS":
      return { ...state, authGroups: action.payload, isLoading: false };
    case "GROUPS_IS_LOADING":
      return { ...state, isLoading: true };
    default:
      return state
  }
};
