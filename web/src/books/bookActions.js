import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/books'

// Obtém a lista de todos os livros
export function fetchAllBooks(config) {
    const page = config.page || 1
    const pageSize = config.pageSize || 12
    const order = config.order || "asc"
    const filter = config.filter || ""
    const filterOn = config.filterOn || ""
    const category = config.category || ""

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

export function selectCategory(category){ return { type: 'SELECT_BOOKS_CATEGORY', payload: category } }
export function selectOrder(order){ return { type: 'SELECT_BOOKS_ORDER', payload: order } }
export function selectPage(page){ return { type: 'SELECT_BOOKS_PAGE', payload: page } }