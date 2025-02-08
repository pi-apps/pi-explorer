import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {
  injectIntl,
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedTime,
} from 'react-intl'
import has from 'lodash/has'

import {stroopsToLumens} from '../lib/stellar/utils'
import {handleFetchDataFailure, setTitle, shortHash} from '../lib/utils'
import ClipboardCopy from './shared/ClipboardCopy'
import {withServer} from './shared/HOCs'
import TransactionTable from './TransactionTableContainer'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

const ledgerHash = hash => shortHash(hash, 20)

const responseToState = rsp => {
  setTitle(`Ledger ${rsp.sequence}`)
  // NOTE: as at 11 March 2018 testnet horizon returns base values in stroops
  //        but mainnet returns in lumens. so handling both until all are moved
  //        to stroops.
  const baseInStroops = has(rsp, 'base_fee_in_stroops')
  return {
    seq: rsp.sequence,
    time: rsp.closed_at,
    txCountSuccessful: rsp.successful_transaction_count,
    txCountFailed: rsp.failed_transaction_count,
    opCount: rsp.operation_count,
    hash: rsp.hash,
    prevHash: rsp.prev_hash,
    prevSeq: Number(rsp.sequence) - 1, // horizon doesn't support ledger lookup by hash - so derive seq - does this break?
    protocol: rsp.protocol_version,
    totalCoins: rsp.total_coins, // maybe display these on the front page ...?
    feePool: rsp.fee_pool,
    maxTxSetSize: rsp.max_tx_set_size,

    baseInStroops,
    baseFee: baseInStroops ? rsp.base_fee_in_stroops : rsp.base_fee,
    baseReserve: baseInStroops ? rsp.base_reserve_in_stroops : rsp.base_reserve,
  }
}

const DetailRow = ({label, children}) => (
  <tr>
    <td>
      <FormattedMessage id={label} />
    </td>
    <td>{children}</td>
  </tr>
)

class Ledger extends React.Component {
  render() {
    const {
      baseInStroops,
      baseFee,
      baseReserve,
      feePool,
      hash,
      maxTxSetSize,
      opCount,
      prevHash,
      prevSeq,
      protocol,
      seq,
      time,
      totalCoins,
      txCountSuccessful,
      txCountFailed,
      urlFn,
    } = this.props

    const {formatMessage} = this.props.intl

    return (
      <Grid>
        <Row>
          <Panel
            header={titleWithJSONButton(
              <span>
                {formatMessage({id: 'ledger'})}{' '}
                <span className="secondary-heading">{seq}</span>
                <ClipboardCopy text={String(seq)} />
              </span>,
              urlFn(seq)
            )}
          >
            <Col md={6}>
              <Table>
                <tbody>
                  <DetailRow label="time">
                    <FormattedDate value={time} />{' '}
                    <FormattedTime value={time} />
                  </DetailRow>
                  <DetailRow label="hash">
                    <span title={hash}>{ledgerHash(hash)}</span>
                  </DetailRow>
                  <DetailRow label="prevHash">
                    <span title={prevHash}>
                      <Link to={`/block/${prevSeq}`}>
                        {ledgerHash(prevHash)}
                      </Link>
                    </span>
                  </DetailRow>
                  <DetailRow label="operations">{opCount}</DetailRow>
                  <DetailRow label="transactions.failed">
                    {txCountFailed}
                  </DetailRow>
                  <DetailRow label="max.transactions">
                    {maxTxSetSize} per block
                  </DetailRow>
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <Table>
                <tbody>
                  <DetailRow label="base.fee">
                    <FormattedNumber value={baseFee * 1e-7} /> Test-π
                  </DetailRow>
                  <DetailRow label="base.reserve">
                    {baseInStroops
                      ? stroopsToLumens(baseReserve)
                      : Number(baseReserve)}{' '}
                    Test-π
                  </DetailRow>
                  <DetailRow label="fee.pool">
                    <FormattedNumber value={feePool} /> Test-π
                  </DetailRow>
                  <DetailRow label="total.coins">
                    <FormattedNumber value={totalCoins} /> Test-π
                  </DetailRow>
                  <DetailRow label="protocolVersion">{protocol}</DetailRow>
                </tbody>
              </Table>
            </Col>
          </Panel>
        </Row>
        {opCount > 0 && (
          <Row>
            <h3>
              <a id="txs-table" aria-hidden="true" />
              <FormattedMessage id="transactions" />
              &nbsp;({txCountSuccessful})
            </h3>
            <TransactionTable
              compact={false}
              ledger={seq}
              limit={200} // horizon limit
              refresh={false}
              showLedger={false}
            />
          </Row>
        )}
      </Grid>
    )
  }
}

class LedgerContainer extends React.Component {
  state = {
    seq: 0,
  }

  componentDidMount() {
    this.loadLedger(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.loadLedger(nextProps.match.params.id)
  }

  loadLedger(ledgerId) {
    this.props.server
      .ledgers()
      .ledger(ledgerId)
      .call()
      .then(res => {
        this.setState(responseToState(res))
        return null
      })
      .catch(handleFetchDataFailure(ledgerId))
  }

  render() {
    return this.state.seq === 0 ? null : (
      <Ledger
        urlFn={this.props.server.ledgerURL}
        {...this.state}
        {...this.props}
      />
    )
  }
}

export default injectIntl(withServer(LedgerContainer))
