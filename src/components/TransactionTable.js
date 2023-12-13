import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

import AccountLink from './shared/AccountLink'
import {withSpinner} from './shared/Spinner'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'
import TransactionHash from './shared/TransactionHash'

class TransactionRow extends React.Component {
  render() {
    const {
      compact,
      hash,
      sourceAccount,
      ledger,
      // parentRenderTimestamp,
      opCount,
      showLedger,
      showSource,
      time,
    } = this.props
    return (
      <tr>
        <td>
          <TransactionHash hash={hash} compact={compact} />
        </td>
        {showSource === true && (
          <td className="account-badge">
            <AccountLink account={sourceAccount} />
          </td>
        )}
        {showLedger === true && (
          <td>
            <Link to={`/block/${ledger}`}>{ledger}</Link>
          </td>
        )}
        <td>
          <Link to={`/tx/${hash}#operations-table`}>{opCount}</Link>
        </td>
        <td>
          <span title={time}>
            <TimeSynchronisedFormattedRelative
              // initialNow={parentRenderTimestamp}
              time={time}
              hash={hash}
            />
          </span>
        </td>
      </tr>
    )
  }
}

TransactionRow.propTypes = {
  compact: PropTypes.bool.isRequired,
  hash: PropTypes.string.isRequired,
  ledger: PropTypes.number.isRequired,
  parentRenderTimestamp: PropTypes.number.isRequired,
  sourceAccount: PropTypes.string.isRequired,
  opCount: PropTypes.number.isRequired,
  showLedger: PropTypes.bool,
  showSource: PropTypes.bool,
  time: PropTypes.string.isRequired,
}

class TransactionTable extends React.Component {
  static defaultProps = {
    compact: true,
    showLedger: true,
    showSource: true,
  }

  render() {
    const {compact, parentRenderTimestamp, showLedger, showSource} = this.props
    return (
      <Table
        id="transaction-table"
        className="table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            <th>#</th>
            {showSource === true && (
              <th>
                <FormattedMessage id="source.account" />
              </th>
            )}
            {showLedger === true && (
              <th>
                <FormattedMessage id="ledger" />
              </th>
            )}
            <th>
              <FormattedMessage id={compact ? 'ops' : 'operations'} />
            </th>
            <th>
              <FormattedMessage id="time" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map(tx => (
            <TransactionRow
              key={tx.hash}
              compact={compact}
              parentRenderTimestamp={parentRenderTimestamp}
              showLedger={showLedger}
              showSource={showSource}
              {...tx}
            />
          ))}
        </tbody>
      </Table>
    )
  }
}

TransactionTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  showLedger: PropTypes.bool,
  showSource: PropTypes.bool,
}

export default withSpinner()(TransactionTable)
