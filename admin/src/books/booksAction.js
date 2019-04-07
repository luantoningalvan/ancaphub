import axios from 'axios'
const BASE_URL = 'http://localhost:3003/api'

export function getBookList(){
    const request = axios.get(`${BASE_URL}/book`)

    return{
        type: 'BOOK_FETCHED',
        payload: request
    }
}