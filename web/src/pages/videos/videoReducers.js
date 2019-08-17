import {
  FETCH_ALL_VIDEOS,
  FETCH_VIDEO,
  SELECT_VIDEOS_CATEGORY,
  SELECT_VIDEOS_ORDER,
  SELECT_VIDEOS_PAGE
} from '../../utils/types'

const INITIAL_STATE = { loading: true, allVideos: [], video: [], filters: { category: '', order: 'asc', page: 1 } }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_VIDEOS:
      return { ...state, allVideos: action.payload, loading: false }
    case FETCH_VIDEO:
      return { ...state, video: action.payload, loading: false }
    case SELECT_VIDEOS_CATEGORY:
      return { ...state, filters: { ...state.filters, category: action.payload } }
    case SELECT_VIDEOS_ORDER:
      return { ...state, filters: { ...state.filters, order: action.payload } }
    case SELECT_VIDEOS_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } }
    default:
      return state
  }
}