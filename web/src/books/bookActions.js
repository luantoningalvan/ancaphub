import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/books'

// Obtém a lista de todos os livros
export function fetchAllBooks() {
    return (dispatch) => {
        axios.get(BASE_URL)
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