import React from 'react'

import ValutaCard from './ValutaCard'

class ConversionCard extends React.Component {

    render() {
        let valutaCards = []
        for (let a = 0; a < 2; a++) {
            const component = <ValutaCard key={a} index={a} data={this.props.data} isLoading={this.props.isLoading} chosenValutas={this.props.chosenValutas} amounts={this.props.amounts} handleValutaChange={this.props.handleValutaChange} handleAmountChange={this.props.handleAmountChange}/>
            valutaCards.push(component)
        }

        return (
            <div className='conversion-cards'>
                {valutaCards}
            </div>
        )
    }
}

export default ConversionCard