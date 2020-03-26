import React from 'react'

import ValutaCard from './ValutaCard'

class ConversionCard extends React.Component {
    constructor() {
        super()
        this.state = {
            baseValuta: 'CAD',
            compareValuta: 'HKD',
            baseAmount: 1000,
            compareAmount: 1000
        }

        this.createFetchURL = this.createFetchURL.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleValutaChange = this.handleValutaChange.bind(this)
        this.calculateAmount = this.calculateAmount.bind(this)
    }

    createFetchURL(valuta) {
        return `https://api.exchangeratesapi.io/latest?base=${valuta}`
    }

    fetchData(valuta) {
        fetch(this.createFetchURL(valuta))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    baseValuta: valuta,
                    data: data,
                })
            })
    }

    handleValutaChange(event) {
        if (event.target.id === '0') {
            const _baseValuta = event.target.value
            fetch(this.createFetchURL(_baseValuta))
                .then(response => response.json())
                .then(data => {
                    const _compareAmount = (this.state.baseAmount * data.rates[this.state.compareValuta]).toFixed(2)
                    this.setState({
                        baseValuta: _baseValuta,
                        compareAmount: _compareAmount,
                        data: data,
                    })
                })
        } else {
            const _compareValuta = event.target.value
            fetch(this.createFetchURL(this.state.baseValuta))
                .then(response => response.json())
                .then(data => {
                    const _baseAmount = (this.state.compareAmount * (1 / data.rates[_compareValuta])).toFixed(2)
                    this.setState({
                        compareValuta: _compareValuta,
                        baseAmount: _baseAmount,
                        data: data,
                    })
                })
        }
    }

    calculateAmount(event) {
        const exchangeRates = this.state.data.rates;
        if (event.target.id === '0') {
            this.setState({
                baseAmount: event.target.value,
                compareAmount: (event.target.value * exchangeRates[this.state.compareValuta]).toFixed(2)
            })
        } else {
            this.setState({
                compareAmount: event.target.value,
                baseAmount: (event.target.value * (1 / exchangeRates[this.state.compareValuta])).toFixed(2)
            })
        }
    }

    componentDidMount() {
        this.fetchData(this.state.baseValuta)
    }

    render() {
        let valutaCards = []
        for (let a = 0; a < 2; a++) {
            const component = <ValutaCard key={a} index={a} data={this.state.data} baseValuta={this.state.baseValuta} compareValuta={this.state.compareValuta} baseAmount={this.state.baseAmount} compareAmount={this.state.compareAmount} handleValutaChange={this.handleValutaChange} calculateAmount={this.calculateAmount}/>
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