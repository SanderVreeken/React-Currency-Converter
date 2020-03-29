import React from 'react'

class ValutaList extends React.Component {

    constructor() {
        super()

        this.getValutaListElements = this.getValutaListElements.bind(this)
    }

    getValutaListElements() {
        const data = this.props.data
        const isLoading = this.props.isLoading
        const exchangeRates = isLoading ? {} : data.rates

        if (Object.keys(exchangeRates).length > 0) {
            const valutas = Object.keys(exchangeRates)
            return valutas.map(function(valuta, index) {
                return (
                    <div key={index} className='valuta-list-card'>
                        <h6>{valuta}: {exchangeRates[valuta].toFixed(4)}</h6>
                    </div>
                )
            })
        } else {
            return (
                // This option will be shown to the user in case the application is loading the data from the API.
                <option>Loading ...</option>
            )
        }     
    }

    render() {  
        return (
            <div className='valuta-list'>
                {this.getValutaListElements()}
            </div>
        )
    }
}

export default ValutaList