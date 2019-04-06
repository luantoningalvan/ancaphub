import React from 'react'

export default props => (
    <section className="hero is-warning">
        <div className="hero-body">
            <div className="container">
            <h1 className="title">
                {props.title}
            </h1>
            <h2 className="subtitle">
                {props.subtitle}
            </h2>
            </div>
        </div>
    </section>
)