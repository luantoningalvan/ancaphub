import axios from 'axios'
import { toastr } from 'react-redux-toastr'
const BASE_URL = 'http://localhost:3000/api/articles'

// Obtém a lista de todos os artigos
export function fetchAllArticles() {
    return (dispatch) => {
        axios.get(BASE_URL)
            .then((articles) => {
                dispatch({ type: "FETCH_ALL_ARTICLES", payload: articles.data });
            }).catch((error) => {
                console.error("Erro ao obter a lista de artigos: ", error);
            })
    }
}

// Obtém os dados de um artigo específico
export function fetchArticle(id) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/${id}`)
            .then((article) => {
                dispatch({ type: "FETCH_ARTICLE", payload: article.data });
            }).catch((error) => {
                console.error("Erro ao obter dados do artigo: ", error);
            })
    }
}

// Prepara o estado da aplicação para gerar um formulário de adição de artigo
export function prepareToCreateNewArticle(){
    return { type: "NEW_ARTICLE"}
}

// Cria um novo artigo
export function createArticle(data) {
    return (dispatch) => {
        if (data.title != "" || data.description != "") {
            axios.post(BASE_URL, data)
                .then(function (data) {
                    toastr.success('Sucesso', 'Artigo Adicionado com Sucesso.')
                    dispatch({ type: "ARTICLE_ADDED", payload: true });
                })
                .catch(function (error) {
                    console.error("Erro ao adicionar artigo: ", error);
                });
        } else {
            console.error("Um ou mais campos não foram preenchidos");
        }
    }
}

// Atualiza um artigo
export function updateArticle(data) {
    return (dispatch) => {
        if (data.title != "" || data.description != "") {
            axios.put(`${BASE_URL}/${data._id}`, data)
                .then(function (article) {
                    toastr.success('Sucesso', 'Artigo Atualizado com Sucesso.')
                    dispatch({ type: "ARTICLE_UPDATED", payload: true });
                    dispatch(fetchArticle(article.data._id));
                })
                .catch(function (error) {
                    console.error("Erro ao atualizar artigo: ", error);
                });
        } else {
            console.error("Um ou mais campos não foram preenchidos");
        }
    }
}

// Remove um artigo pelo seu id
export function deleteArticle(id) {
    return (dispatch) => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(function (docRef) {
                toastr.success('Sucesso', 'Artigo Removido com Sucesso.')
                dispatch({ type: "ARTICLE_DELETED", payload: true });
                dispatch(fetchAllArticles())
            })
            .catch(function (error) {
                console.error("Erro ao deletar artigo: ", error);
            });
    }
}
