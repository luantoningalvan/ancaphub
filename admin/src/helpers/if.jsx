import React from 'react'

export default props => {
    if(props.cond){
        return(
            props.children
        )
    } else{
        return null
    }
}