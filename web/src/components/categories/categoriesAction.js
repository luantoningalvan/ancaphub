import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/categories'

// Obtém a lista de todas as categorias
export function fetchAllCategories() {
    return (dispatch) => {
        axios.get(BASE_URL)
            .then((categories) => {
                dispatch({ type: "FETCH_ALL_CATEGORIES", payload: categories.data });
            }).catch((error) => {
                console.error("Erro ao obter a lista de categorias: ", error);
            })
    }
}

// Cria uma nova categoria
export const createCategory = (data) => {
    return (dispatch) => {
      axios.post(BASE_URL, data)
          .then(function (category) {
              dispatch({ type: "CATEGORY_ADDED", payload: category });
              dispatch(fetchAllCategories());
          })
          .catch(function (error) {
              console.error("Erro ao adicionar categoria: ", error);
          });
    }
}

export function setCategoriesLoading () {
  return {
    type: 'CATEGORIES_LOADING'
  };
};
