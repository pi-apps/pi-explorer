import React from 'react'
import PropTypes from 'prop-types'
import FetchPonyfill from 'fetch-ponyfill'
const fetch = FetchPonyfill().fetch

const FEED_URL = 'https://api.coinmarketcap.com/v1/ticker/stellar/'
const UPDATE_INTERVAL = 5 * 60 * 1000

class LumensRatesContainer extends React.PureComponent {
  componentDidMount() {
    this.updatePrice()
    this.intervalId = setInterval(
      () => this.updatePrice.bind(this),
      UPDATE_INTERVAL
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updatePrice() {
    fetch(FEED_URL)
      .then(rsp => rsp.json())
      .then(rspJson => {
        const lumens = rspJson[0]
        const newState = {
          change: lumens.percent_change_24h,
          usd: lumens.price_usd,
        }
        this.setState(newState)
      })
      .catch(err => {
        console.error(`Failed to fetch price: [${err}]`)
        console.error(`stack: [${err.stack}]`)
      })
  }

  render() {
    if (!this.state) return null
    return <LumensRates {...this.state} />
  }
}

class LumensRates extends React.PureComponent {
  isPositive(changeNumStr) {
    const asFloat = Number.parseFloat(changeNumStr)
    return Number.isNaN(asFloat) === false && Number(asFloat) >= 0
  }

  renderChange(change) {
    const positive = this.isPositive(change)
    const valueStr = `${positive ? '+' : ''}${this.props.change}%`
    const style = {
      color: positive ? '#00c292' : '#fb9678',
    }
    return <span style={style}>{valueStr}</span>
  }

  render() {
    return (
      <span>
        Test-π/USD: {this.props.usd} {this.renderChange(this.props.change)}
      </span>
    )
  }
}

LumensRates.propTypes = {
  change: PropTypes.string.isRequired,
  usd: PropTypes.string.isRequired,
}

export {LumensRatesContainer as default, LumensRates}
