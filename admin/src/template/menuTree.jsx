import React from 'react'

export default props => (
    <li>
        <ul className="collapsible collapsible-accordion">
            <li>
                <a className="collapsible-header waves-effect waves-blue">
                    <i className="material-icons">{props.icon}</i>{props.label} 
                    <i className="material-icons right">arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                    <ul>
                        {props.children}
                    </ul>
                </div>
            </li>
        </ul>
    </li>
)