const signIn = (values) => {
    return {
        type: 'LOGIN',
        dispatch: values
    }
}

const signUp = (values) => {
    return {
        type: 'LOGIN',
        dispatch: values
    }
}

export {signIn, signUp}