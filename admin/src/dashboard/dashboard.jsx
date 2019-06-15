import React from 'react'
import Template from '../template/template'
import { connect } from 'react-redux'

function Dashboard(props) {
    return (
        <Template>
            Olá {props.auth.name}
        </Template>
    )

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard)