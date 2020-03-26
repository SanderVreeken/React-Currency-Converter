 import React from 'react'

 class ValutaCard extends React.Component {

    constructor() {
        super()
        this.getExchangeRates = this.getExchangeRates.bind(this)
        this.getPossibleValutas = this.getPossibleValutas.bind(this)
    }

    getExchangeRates(data) {
        if (typeof data === 'object') {
            return data.rates
        }     
    }

    getPossibleValutas(data) {
        if (typeof data === 'object') {
            const valutas = Object.keys(data.rates)
            return valutas.map(function(valuta, index) {
                return (
                    <option key={index} value={valuta}>{valuta}</option>
                )
            })
        }        
    }

    render() {
    
        return (
            <div className={`valuta-card ${this.props.index === 1 ? 'light-blue' : 'white'}`}>
                <div className={`valuta-card-header ${this.props.index === 1 ? 'light-blue' : 'white'}`}>
                    <form>
                        <select id={this.props.index} className={`btn btn-secondary btn-sm valuta-selector ${this.props.index === 0 ? 'light-blue' : 'white'}`} value={this.props.index === 0 ? this.props.baseValuta : this.props.compareValuta} onChange={this.props.handleValutaChange}>
                            {this.getPossibleValutas(this.props.data)}                  
                        </select>
                    </form>
                </div>
                <hr />
                <div className={`valuta-card-main ${this.props.index === 1 ? 'light-blue' : 'white'}`}>
                    <form className='valuta-form'>
                        <input type='text' id={this.props.index} className={`amount-input ${this.props.index === 1 ? 'light-blue' : 'white'}`} value={this.props.index === 0 ? this.props.baseAmount : this.props.compareAmount} onChange={this.props.calculateAmount}></input>
                    </form>
                <p className='conversion-label'>{`1 ${this.props.index === 0 ? this.props.baseValuta : this.props.compareValuta} is ${this.getExchangeRates(this.props.data) === undefined ? 'NaN' : this.props.index === 0 ? parseFloat(this.getExchangeRates(this.props.data)[this.props.compareValuta]).toFixed(4) : parseFloat(1/this.getExchangeRates(this.props.data)[this.props.compareValuta]).toFixed(4)} ${this.props.index === 1 ? this.props.baseValuta : this.props.compareValuta}`}</p>
                </div>
            </div>
        )
    }
 }

 export default ValutaCard