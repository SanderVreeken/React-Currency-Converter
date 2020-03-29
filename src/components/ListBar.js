import React from 'react'

import ListBarCard from './ListBarCard'

class ListBar extends React.Component {

    render() {
        return (
            <div className='list-bar'>
                <ListBarCard data={this.props.data} isLoading={this.props.isLoading}/>
            </div>
        )
    }
}

export default ListBar