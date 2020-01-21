import axios from '../services/api';
import types from './_types'

export const getBookmarks = () => dispatch => {
    axios
      .get(`/api/bookmarks`)
      .then(collection => {
        console.log(collection.data)
        dispatch({
          type: types.GET_BOOKMARKS_SUCCESS,
          payload: collection.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.GET_BOOKMARKS_FAIL,
          payload: err
        });
      });
  };

export const addBookmark = (item, location = 'items') => async dispatch => {
    try {
      const res = await axios.post('/api/bookmarks', { item });
      dispatch({
        type: types.ADD_BOOKMARK_SUCCESS,
        payload: { item: res.data, location}
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: types.ADD_BOOKMARK_FAIL
      });
    }
  };