import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'
import {withSpinner} from './shared/Spinner'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'

const LedgerRow = props => (
  <tr>
    <td>
      <Link to={`/block/${props.sequence}`}>{props.sequence}</Link>
    </td>
    <td>
      {props.txCountSuccessful > 0 ? (
        <Link to={`/block/${props.sequence}#txs-table`}>{props.txCountSuccessful}</Link>
      ) : (
        props.txCountSuccessful
      )} 
      {props.compact === false && (<span>{' '}successful</span>)} 
       {' '}/ {props.txCountFailed} 
       {props.compact === false && (<span>{' '}failed</span>)}
    </td>
    <td>
      <span title={props.time}>
        <TimeSynchronisedFormattedRelative
          initialNow={props.parentRenderTimestamp}
          time={props.time}
          hash={props.hash}
        />
      </span>
    </td>
  </tr>
)

LedgerRow.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  sequence: PropTypes.number,
  txCountSuccessful: PropTypes.number,
  txCountFailed: PropTypes.number,
  time: PropTypes.string,
}

class LedgerTable extends React.PureComponent {
  render() {
    return (
      <Table
        id="ledger-table"
        className="table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="transactions" />
            </th>
            <th>
              <FormattedMessage id="time" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map(ledger => (
            <LedgerRow
              compact={this.props.compact}
              key={ledger.sequence}
              sequence={ledger.sequence}
              parentRenderTimestamp={this.props.parentRenderTimestamp}
              time={ledger.time}
              txCountSuccessful={ledger.txCountSuccessful}
              txCountFailed={ledger.txCountFailed}
            />
          ))}
        </tbody>
      </Table>
    )
  }
}

LedgerTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array,
}

export default withSpinner()(LedgerTable)
