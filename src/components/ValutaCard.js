 import React from 'react'

 class ValutaCard extends React.Component {

    constructor() {
        super()

        this.getValutaElements = this.getValutaElements.bind(this)
        this.getAmountValues = this.getAmountValues.bind(this)
        this.getExchangeLine = this.getExchangeLine.bind(this)
    }

    getValutaElements() {
        const data = this.props.data
        const isLoading = this.props.isLoading
        const exchangeRates = isLoading ? {} : data.rates

        if (Object.keys(exchangeRates).length > 0) {
            const valutas = Object.keys(exchangeRates)
            return valutas.map(function(valuta, index) {
                return (
                    <option key={index} value={valuta}>{valuta}</option>
                )
            })
        } else {
            return (
                // This option will be shown to the user in case the application is loading the data from the API.
                <option>Loading ...</option>
            )
        }     
    }

    getAmountValues() {
        const data = this.props.data
        const isLoading = this.props.isLoading
        const amounts = this.props.amounts
        const index = this.props.index
        const exchangeRates = isLoading ? {} : data.rates

        if (Object.keys(exchangeRates).length > 0) {
            if (index === 0) {
                return amounts[0]
            } else {
                return amounts[1]
            }
        } else {
            return 'Loading ...'
        }
    }

    getExchangeLine() {
        const data = this.props.data
        const isLoading = this.props.isLoading
        const chosenValutas = this.props.chosenValutas
        const index = this.props.index
        const exchangeRates = isLoading ? {} : data.rates

        // If-else to check whether the data from the API is loaded in the constant.
        if (Object.keys(exchangeRates).length > 0) {
            //  If-else statement to check whether it is the left or right valutaCard.
            if (index === 0) {
                return `1 ${chosenValutas[index]} is ${exchangeRates[chosenValutas[1]].toFixed(4)} ${chosenValutas[1]}`
            } else {
                return `1 ${chosenValutas[1]} is ${(1 / exchangeRates[chosenValutas[1]]).toFixed(4)} ${chosenValutas[0]}`
            }
        } else {
            return 'Loading ...'
        }
    }

    render() {    
        
        return (
            <div className={`valuta-card ${this.props.index === 0 ? 'white' : 'light-blue'}`}>
                <div className={`valuta-card-header ${this.props.index === 0 ? 'white' : 'light-blue'}`}>
                    <form>
                        <select name='valuta' id={this.props.index} className={`btn btn-secondary btn-sm valuta-selector ${this.props.index === 0 ? 'light-blue' : 'white'}`} value={this.props.index === 0 ? this.props.chosenValutas[0] : this.props.chosenValutas[1]} onChange={this.props.handleValutaChange}>
                            {this.getValutaElements()}
                        </select>
                    </form>
                </div>
                <hr />
                <div className={`valuta-card-main ${this.props.index === 0 ? 'white' : 'light-blue'}`}>
                    <form className='valuta-form'>
                        <input type='text' name='amount' id={this.props.index} className={`amount-input ${this.props.index === 0 ? 'white' : 'light-blue'}`} value={this.getAmountValues()} onChange={this.props.handleAmountChange}></input>
                    </form>
                        <p className='conversion-label'>{this.getExchangeLine()}</p>
                </div>
            </div>
        )
    }
 }

 export default ValutaCard