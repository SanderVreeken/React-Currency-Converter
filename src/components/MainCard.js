import React from 'react'

import MainHeader from './MainHeader'
import ConversionCard from './ConversionCard'

class MainCard extends React.Component {

    render() {

        return (
            <div className='main-card'>
                <MainHeader title='exchange'/>
                <ConversionCard data={this.props.data} isLoading={this.props.isLoading} chosenValutas={this.props.chosenValutas} amounts={this.props.amounts} handleValutaChange={this.props.handleValutaChange} handleAmountChange={this.props.handleAmountChange}/>
            </div>
        )
    }
}

export default MainCard