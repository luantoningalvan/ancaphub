const INITIAL_STATE = {teste:'teste'}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "LOGIN":
            console.log(action.dispatch)
            return 'console.log(action.dispatch)'
        default:
            return state 
    }
}
