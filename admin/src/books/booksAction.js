import axios from 'axios'
import { toastr } from 'react-redux-toastr'
const BASE_URL = 'http://localhost:3000/api/books'

export function list(){
    return (dispatch) => {
        axios.get(BASE_URL)
        .then((data) => {
            const books = data
            dispatch({type:"FETCH_BOOKS", payload: books.data});
        }).catch((error) => {
            console.error("Erro ao obter a lista de livros: ", error);
        })
    }
}

export function create(data){
    return (dispatch) => {
        if(data.name != "" || data.balance != ""){
            axios.post(BASE_URL, data)
            .then(function(data) {
                toastr.success('Sucesso', 'Livro Adicionado com Sucesso.')
                dispatch({type:"BOOK_ADDED", payload: true});
            })
            .catch(function(error) {
                console.error("Erro ao adicionar documento: ", error);
            });
        } else {
            console.error("Um ou mais campos não foram preenchidos");
        }
    }
}

export function remove(id){
    return (dispatch) => {
        axios.delete(`${BASE_URL}/${id}`)
        .then(function(docRef) {
            toastr.success('Sucesso', 'Livro Removido com Sucesso.')
            dispatch({type:"BOOK_REMOVED", payload: true});
            dispatch(list())
        })
        .catch(function(error) {
            console.error("Erro ao deletar livro: ", error);
        });
    }
}