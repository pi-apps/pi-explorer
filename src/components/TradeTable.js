import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage} from 'react-intl'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'

import AccountLink from './shared/AccountLink'
import FormattedAmount from './shared/FormattedAmount'
import Asset from './shared/Asset'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import {withPaging} from './shared/Paging'
import {withSpinner} from './shared/Spinner'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'
import CSVExport from './shared/CSVExport'

import {isPublicKey} from '../lib/stellar/utils'

const Trade = ({account, singleAccountView, trade, parentRenderTimestamp}) => {
  const Base = (
    <span>
      <FormattedAmount amount={trade.baseAmount} />{' '}
      <Asset
        code={trade.baseAssetCode}
        issuer={trade.baseAssetIssuer}
        type={trade.baseAssetType}
      />
    </span>
  )

  const Counter = (
    <span>
      <FormattedAmount amount={trade.counterAmount} />{' '}
      <Asset
        code={trade.counterAssetCode}
        issuer={trade.counterAssetIssuer}
        type={trade.counterAssetType}
      />
    </span>
  )

  let baseFirst
  let account1, account2

  if (singleAccountView) {
    const accountIsBase = account === trade.baseAccount
    baseFirst = !accountIsBase // account's bought asset first
    account1 = account
    account2 = accountIsBase ? trade.counterAccount : trade.baseAccount
  } else {
    baseFirst = trade.baseIsSeller
    account1 = trade.baseAccount
    account2 = trade.counterAccount
  }

  return (
    <tr key={trade.id} className="trade">
      <td>
        <span className="account-badge">
          <AccountLink account={account1} />
        </span>
      </td>
      <td>{baseFirst ? Base : Counter}</td>
      <td>
        <span className="account-badge">
          <AccountLink account={account2} />
        </span>
      </td>
      <td>{baseFirst ? Counter : Base}</td>
      <td>
        <span title={trade.time}>
          <TimeSynchronisedFormattedRelative
            initialNow={parentRenderTimestamp}
            time={trade.time}
          />
        </span>
      </td>
    </tr>
  )
}

Trade.propTypes = {
  parentRenderTimestamp: PropTypes.number,
  trade: PropTypes.shape({
    id: PropTypes.string.isRequired,
    baseIsSeller: PropTypes.bool.isRequired,
    baseAccount: PropTypes.string.isRequired,
    counterAccount: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  account: PropTypes.string,
  singleAccountView: PropTypes.bool,
}

class TradeTable extends React.Component {
  componentDidMount() {
    if (this.props.page === 0 && this.props.records.length < this.props.limit) {
      this.props.hidePagingFn()
    }
  }

  render() {
    const {server, parentRenderTimestamp, account, records} = this.props

    if (records.length === 0)
      return <div style={{marginTop: 20, marginBottom: 20}}>No Trades</div>

    const singleAccountView = isPublicKey(account)

    return (
      <div>
        <Table
          id="trade-table"
          className="table-striped table-hover table-condensed"
        >
          <thead>
            <tr>
              <th>
                <FormattedMessage id="account" />
                {' 1'}
              </th>
              <th>
                <FormattedMessage id="bought" />
              </th>
              <th>
                <FormattedMessage id="account" />
                {' 2'}
              </th>
              <th>
                <FormattedMessage id="bought" />
              </th>
              <th>
                <FormattedMessage id="time" />
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map(trade => (
              <Trade
                key={trade.id}
                trade={trade}
                account={account}
                singleAccountView={singleAccountView}
                parentRenderTimestamp={parentRenderTimestamp}
              />
            ))}
          </tbody>
        </Table>
        <div className="text-center" id="csv-export">
          <ExportToCSVComponent account={account} server={server} />
        </div>
      </div>
    )
  }
}

TradeTable.propTypes = {
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  server: PropTypes.object.isRequired,
  account: PropTypes.string,
  accountView: PropTypes.bool,
}

const rspRecToPropsRec = record => {
  record.time = record.ledger_close_time
  return mapKeys(record, (v, k) => camelCase(k))
}

const fetchRecords = ({account, limit, server}) => {
  const builder = server.trades()
  if (account) builder.forAccount(account)
  builder.limit(limit)
  builder.order('desc')
  return builder.call()
}

const callBuilder = props => props.server.trades()

const ExportToCSVComponent = withDataFetchingAllContainer(
  fetchRecords,
  callBuilder
)(CSVExport)

const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropsRec, callBuilder),
  withSpinner()
)

export default enhance(TradeTable)
