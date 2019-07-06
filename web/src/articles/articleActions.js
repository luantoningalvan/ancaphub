import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/articles'

// Obtém a lista de todos os livros
export function fetchAllArticles(page = 2, pageSize = 2, order="desc", filter="", filterOn="", category="") {
    return (dispatch) => {
          axios.get(`${BASE_URL}?page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}${category && `&&category=${category}`}`)
            .then((articles) => {
                dispatch({ type: "FETCH_ALL_ARTICLES", payload: articles.data });
            }).catch((error) => {
                console.error("Erro ao obter a lista de livros: ", error);
            })
    }
}

export function fetchArticle(id) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/${id}`)
            .then((article) => {
                dispatch({ type: "FETCH_ARTICLE", payload: article.data });
            }).catch((error) => {
                console.error("Erro ao obter dados do livro: ", error);
            })
    }
}
