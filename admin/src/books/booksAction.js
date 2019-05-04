import axios from 'axios'
const BASE_URL = 'http://localhost:3333'

export function getBookList(){
    const request = axios.get(`${BASE_URL}/books`)

    return{
        type: 'BOOK_FETCHED',
        payload: request
    }
}

export function create(values){
    const request = axios.post(`${BASE_URL}/books`, values)
    return {
        type: 'BOOK_ADDED',
        payload: 'Teste'
    }
}