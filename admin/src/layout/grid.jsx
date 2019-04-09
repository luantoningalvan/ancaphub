import React, { Component } from 'react'

export default class Grid extends Component {

    toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : []
        let classes = 'col'

        if(cols[0]) classes += ` s${cols[0]}` 
        if(cols[1]) classes += ` m${cols[1]}`
        if(cols[2]) classes += ` l${cols[2]}`
        if(cols[3]) classes += ` xl${cols[3]}`

        return classes 
    }

    render() {
        const gridClasses = this.toCssClasses(this.props.cols || '12')
        return (
            <div className={gridClasses}> 
                {this.props.children}
            </div> 
        )
    }
}