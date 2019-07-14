
  const initialState = {
    allUsers: [],
    user: {},
    userLibrary: {},
    loading: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case 'GET_ALL_USERS_SUCCESS':
          return{
            ...state,
            allUsers: action.payload
          }  
      case 'GET_USER_SUCCESS':
          return{
            ...state,
            user: action.payload
          }
      case "GET_USER_LIBRARY_SUCCESS":
        return {
          ...state,
          userLibrary: action.payload
        }
      default:
        return state;
    }
  }