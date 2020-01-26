import axios from '../services/api';
import types from './_types'
import { showSnack } from './alertActions'

export const updateUsername = username => async dispatch => {
    dispatch({ type: types.LOADING_AUTH })
  
    try {
      const res = await axios.patch("/api/users/username", {username})
  
      dispatch({
        type: types.UPDATE_USERNAME_SUCCESS,
        payload: res.data
      })
      dispatch(showSnack('Nome de usuário atualizado com Sucesso'));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USERNAME_FAIL,
        payload: error
      })
      dispatch(showSnack(error.message, 'error'));
    }
  }
  
  export const updateEmail = email => async dispatch => {
    dispatch({ type: types.LOADING_AUTH })
  
    try {
      const res = await axios.patch("/api/users/email", {email})
  
      dispatch({
        type: types.UPDATE_EMAIL_SUCCESS,
        payload: res.data
      })
      dispatch(showSnack('E-mail atualizado com Sucesso'));
    } catch (error) {
      dispatch({
        type: types.UPDATE_EMAIL_FAIL,
        payload: error
      })
      dispatch(showSnack(error.message, 'error'));
    }
  }
  
  export const updatePassword = (currentPassword, newPassword) => async dispatch => {
    dispatch({ type: types.LOADING_AUTH })
  
    try {
      const res = await axios.patch("/api/users/password", {currentPassword, newPassword})
  
      dispatch({
        type: types.UPDATE_PASSWORD_SUCCESS,
        payload: res.data
      })
      dispatch(showSnack('Senha atualizada com Sucesso'));
    } catch (error) {
      dispatch({
        type: types.UPDATE_PASSWORD_FAIL,
        payload: error
      })
      dispatch(showSnack(error.message, 'error'));
    }
  }
  