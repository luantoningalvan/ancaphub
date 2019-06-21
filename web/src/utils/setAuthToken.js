import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // Aplica o token de autorização para todas as requisições caso esteja logado
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Deleta o cabeçalho de autenticação
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;