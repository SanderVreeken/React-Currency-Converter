import React from 'react'

import ListHeader from './ListHeader'
import ValutaList from './ValutaList'

class ListBarCard extends React.Component {

    render() {
        return (
            <div className='list-bar-card'>
                <ListHeader data={this.props.data} isLoading={this.props.isLoading}/>
                <ValutaList data={this.props.data} isLoading={this.props.isLoading}/>
            </div>
        )
    }
}

export default ListBarCard