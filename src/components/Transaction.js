import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  injectIntl,
} from 'react-intl'
import PropTypes from 'prop-types'
import {MemoHash, MemoReturn} from 'stellar-sdk'

import {base64DecodeToHex, handleFetchDataFailure, setTitle} from '../lib/utils'
import ClipboardCopy from './shared/ClipboardCopy'
import {withServer} from './shared/HOCs'
import OperationTable from './OperationTable'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

const memoTypeToLabel = {
  id: 'ID',
  hash: 'Hash',
  none: 'None',
  return: 'Return',
  text: 'Text',
}

class Transaction extends React.Component {
  static defaultProps = {
    operations: [],
  }

  render() {
    const {id, urlFn, fee, ledger, memoType, memo, opCount, time} = this.props
    if (!id) return null
    
    setTitle(`Transaction ${id}`)
    
    const {formatMessage} = this.props.intl

    return (
      <Grid>
        <Row>
          <Panel
            header={titleWithJSONButton(
              <span>
                {formatMessage({id: 'transaction'})}{' '}
                <span className="secondary-heading">{id}</span>
                <ClipboardCopy text={id} />
              </span>,
              urlFn(id)
            )}
          >
            <Table>
              <tbody>
                <tr>
                  <td>
                    <FormattedMessage id="time" />
                  </td>
                  <td>
                    <FormattedDate value={time} />&nbsp;
                    <FormattedTime value={time} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="fee" />
                  </td>
                  {/* <td>{fee} stroops</td> */}
                  <td>{fee * 1e-7} Test-π</td>

                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="ledger" />
                  </td>
                  <td>
                    <Link to={`/block/${ledger}`}>{ledger}</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="memo" />{' '}
                    <span className="secondary-heading">
                      ({memoTypeToLabel[memoType]})
                    </span>
                  </td>
                  <td>
                    {memoType === MemoHash || memoType === MemoReturn
                      ? base64DecodeToHex(memo)
                      : memo}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>
        </Row>
        <Row>
          <h3>
            <a id="operations-table" aria-hidden="true" />
            <FormattedMessage id="operations" />
            {` (${opCount})`}
          </h3>
          <Grid>
            <OperationTable limit={opCount} tx={id} is_transaction={true}/>
          </Grid>
        </Row>
      </Grid>
    )
  }
}

Transaction.propTypes = {
  fee: PropTypes.number,
  id: PropTypes.string,
  ledger: PropTypes.number,
  memo: PropTypes.string,
  memoType: PropTypes.string,
  operations: PropTypes.array,
  time: PropTypes.string,
  urlFn: PropTypes.func,
}

const TransactionIntl = injectIntl(Transaction)

class TransactionContainer extends React.Component {
  state = {
    operations: [],
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const server = this.props.server
    server
      .transactions()
      .transaction(id)
      .call()
      .then(res => {
        this.setState({tx: res})
        return null
      })
      .catch(handleFetchDataFailure(id))
  }

  render() {
    if (!this.state.tx) return null
    const tx = this.state.tx
    return (
      <TransactionIntl
        id={tx.id}
        // fee={tx.fee_paid}
        fee={tx.fee_charged}
        ledger={tx.ledger_attr}
        memoType={tx.memo_type}
        memo={tx.memo}
        opCount={tx.operation_count}
        time={tx.created_at}
        urlFn={this.props.server.txURL}
      />
    )
  }
}

export default withServer(TransactionContainer)
