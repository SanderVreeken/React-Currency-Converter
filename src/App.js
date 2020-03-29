import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import MainCard from './components/MainCard';
import ListBar from './components/ListBar'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
        isLoading: true,
        chosenValutas: ['USD', 'EUR'],
        amounts: [500, '']
    }
    this.fetchData = this.fetchData.bind(this)
    this.handleValutaChange = this.handleValutaChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  fetchData(baseValuta) {
    this.setState({
      isLoading: true
    })
    fetch(`https://api.exchangeratesapi.io/latest?base=${baseValuta}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          isLoading: false
        })
      })
  }

  handleValutaChange(event) {
    const index = event.target.id
    const value = event.target.value

    if (index === '0') {
      this.setState(prevState => ({
        isLoading: true,
        chosenValutas: [value, prevState.chosenValutas[1]],
      }))
      fetch(`https://api.exchangeratesapi.io/latest?base=${value}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          isLoading: false
        })
        console.log(data)
        const isLoading = this.state.isLoading
        const chosenValutas = this.state.chosenValutas
        const exchangeRates = isLoading ? {} : data.rates

        this.setState(prevState => ({
          amounts: [prevState.amounts[0], prevState.amounts[0] * exchangeRates[chosenValutas[1]]]
        }))
      })
    } else {
      this.setState(prevState => ({
        chosenValutas: [prevState.chosenValutas[0], value]
      }))
      const data = this.state.data
      const isLoading = this.state.isLoading
      const exchangeRates = isLoading ? {} : data.rates

      this.setState(prevState => ({
        amounts: [prevState.amounts[1] * (1 / exchangeRates[value]), prevState.amounts[1]]
      }))
    }
  }

  handleAmountChange(event) {
    const data = this.state.data
    const isLoading = this.state.isLoading
    const chosenValutas = this.state.chosenValutas
    const exchangeRates = isLoading ? {} : data.rates

    const index = event.target.id
    const value = event.target.value

    // If statement in order to use the same function for multple ways to handle changes.
    if (Object.keys(exchangeRates).length > 0) {
      if (index === '0') {
        this.setState({
          amounts: [value, value * exchangeRates[chosenValutas[1]]]
        })
      } else {
        this.setState({
          amounts: [value * (1 / exchangeRates[chosenValutas[1]]), value]
        })
      }
    } else {
      this.setState({
        amounts: ['Loading ...', 'Loading ...']
      })
    }
  }

  componentDidMount() {
    this.fetchData(this.state.chosenValutas[0])
  }

  render() {

    return (
      <div className="application">
        <MainCard data={this.state.data} isLoading={this.state.isLoading} chosenValutas={this.state.chosenValutas} amounts={this.state.amounts} handleValutaChange={this.handleValutaChange} handleAmountChange={this.handleAmountChange}/>
        <ListBar data={this.state.data} isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default App;
