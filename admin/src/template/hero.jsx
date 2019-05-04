import React from 'react'
import Container from '@material-ui/core/Container';

export default props => (
    <div className="hero">
        <Container>
            <div className="row">
                <div className="col s12 m6 l4"><h2>{props.title}</h2></div>
                <div className="col s12 m6 l8 right-align">{props.actions}</div>
            </div>
        </Container>
    </div>
)