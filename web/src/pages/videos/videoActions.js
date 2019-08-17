import axios from 'axios'
import { showSnack } from '../../alerts/alertActions'
import {
  FETCH_ALL_VIDEOS,
  FETCH_VIDEO,
  SELECT_VIDEOS_CATEGORY,
  SELECT_VIDEOS_ORDER,
  SELECT_VIDEOS_PAGE,
  ADD_VIDEO_SUCCESS
} from '../../utils/types'

const BASE_URL = 'http://localhost:3000/api/items'

// Obtém a lista de todos os livros
export function fetchAllVideos(config) {
  const page = config.page || 1
  const pageSize = config.pageSize || 12
  const order = config.order || "asc"
  const filter = config.filter || ""
  const filterOn = config.filterOn || ""
  const category = config.category || ""

  return (dispatch) => {
    axios.get(`${BASE_URL}?type=video&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}${category && `&&category=${category}`}`)
      .then((videos) => {
        dispatch({ type: FETCH_ALL_VIDEOS, payload: videos.data });
      }).catch((error) => {
        console.error("Erro ao obter a lista de livros: ", error);
      })
  }
}

export function fetchVideo(id) {
  return (dispatch) => {
    axios.get(`${BASE_URL}/${id}`)
      .then((video) => {
        dispatch({ type: FETCH_VIDEO, payload: video.data });
      }).catch((error) => {
        console.error("Erro ao obter dados do livro: ", error);
      })
  }
}

export function selectCategory(category) { return { type: SELECT_VIDEOS_CATEGORY, payload: category } }
export function selectOrder(order) { return { type: SELECT_VIDEOS_ORDER, payload: order } }
export function selectPage(page) { return { type: SELECT_VIDEOS_PAGE, payload: page } }

export function addVideo(data) {
  return (dispatch) => {
    axios.post(`${BASE_URL}`, { ...data, type: "video" })
      .then((video) => {
        dispatch({ type: ADD_VIDEO_SUCCESS, payload: video.data });
        dispatch(showSnack("Livro Adicionado com Sucesso"));
      }).catch((error) => {
        console.error("Erro ao adicionar livro: ", error);
      })
  }
}