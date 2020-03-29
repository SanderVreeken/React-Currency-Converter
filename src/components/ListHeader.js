import React from 'react'

class ListHeader extends React.Component {
    constructor() {
        super()

        this.getBaseValuta = this.getBaseValuta.bind(this)
    }

    getBaseValuta() {
        const isLoading = this.props.isLoading
        const data = isLoading ? {} : this.props.data

        if (Object.keys(data).length > 0) {
            return data.date
        }
    }

    render() {
        this.getBaseValuta()

        return (
            <div className='list-header light-blue'>
                <h6>Last Updated: {this.getBaseValuta()}</h6>
            </div>
        )
    }
}

export default ListHeader