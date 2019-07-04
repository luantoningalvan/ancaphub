import axios from 'axios'
import { toastr } from 'react-redux-toastr'
const BASE_URL = 'http://localhost:3000/api/books'

// Obtém a lista de todos os livros
export function fetchAllBooks(page = 2, pageSize = 2, order="desc", filter="", filterOn="") {
    return (dispatch) => {
        axios.get(`${BASE_URL}?page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}`)
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

export function prepareToCreateNewBook(){
    return { type: "NEW_BOOK"}
}

// Cria um novo livro
export function createBook(data) {
    return (dispatch) => {
        if (data.title != "" || data.description != "") {
            axios.post(BASE_URL, data)
                .then(function (data) {
                    toastr.success('Sucesso', 'Livro Adicionado com Sucesso.')
                    dispatch({ type: "BOOK_ADDED", payload: true });
                })
                .catch(function (error) {
                    console.error("Erro ao adicionar livro: ", error);
                });
        } else {
            console.error("Um ou mais campos não foram preenchidos");
        }
    }
}

export function updateBook(data) {
    return (dispatch) => {
        if (data.title != "" || data.description != "") {
            axios.put(`${BASE_URL}/${data._id}`, data)
                .then(function (book) {
                    toastr.success('Sucesso', 'Livro Atualizado com Sucesso.')
                    dispatch({ type: "BOOK_UPDATED", payload: true });
                    dispatch(fetchBook(book.data._id));
                })
                .catch(function (error) {
                    console.error("Erro ao atualizar livro: ", error);
                });
        } else {
            console.error("Um ou mais campos não foram preenchidos");
        }
    }
}

// Remove um livro pelo seu id
export function deleteBook(id) {
    return (dispatch) => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(function (docRef) {
                toastr.success('Sucesso', 'Livro Removido com Sucesso.')
                dispatch({ type: "BOOK_DELETED", payload: true });
                dispatch(fetchAllBooks())
            })
            .catch(function (error) {
                console.error("Erro ao deletar livro: ", error);
            });
    }
}
