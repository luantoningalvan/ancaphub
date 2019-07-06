import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/books'

// Obtém a lista de todos os livros
export function fetchAllBooks(page = 2, pageSize = 2, order="desc", filter="", filterOn="", category="") {
    return (dispatch) => {
        axios.get(`${BASE_URL}?page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}${category && `&&category=${category}`}`)
            .then((books) => {
                dispatch({ type: "FETCH_ALL_BOOKS", payload: books.data });
            }).catch((error) => {
                console.error("Erro ao obter a lista de livros: ", error);
            })
    }
}

export function fetchBook(id) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/${id}`)
            .then((book) => {
                dispatch({ type: "FETCH_BOOK", payload: book.data });
            }).catch((error) => {
                console.error("Erro ao obter dados do livro: ", error);
            })
    }
}
