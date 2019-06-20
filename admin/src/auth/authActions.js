import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { returnErrors } from '../errors/errorAction'
import { LOGIN_SUCCESS, LOGIN_FAIL, SET_CURRENT_USER, USER_LOADING } from "../types";

const BASE_URL = 'http://localhost:3000/api/users'

// Login - obtém o token do usuário
export const login = data => dispatch => {
  const userData = { ...data, role: "admin"}

  axios
    .post(`${BASE_URL}/login`, userData)
    .then(res => {
      // Seta o token no localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Seta o token no cabeçalho de autenticação
      setAuthToken(token);
      // Decodifica o token para obter os dados do usuário
      const decoded = jwt_decode(token);
      // Seta o usuário atual
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Seta o usuário logado
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Carregando usuário
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Logout do usuário
export const logoutUser = () => dispatch => {
  // Remove o token do localstorage
  localStorage.removeItem("jwtToken");
  // Remove o cabeçalho de autenticação para requisições futuras
  setAuthToken(false);
  // Seta o usuário atual para um objeto vazio {} também seta o isAuthenticated para falso
  dispatch(setCurrentUser({}));
};