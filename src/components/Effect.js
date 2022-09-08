import React from 'react'
import propTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import truncate from 'lodash/truncate'

import Offer from './operations/Offer'
import AccountLink from './shared/AccountLink'
import Asset from './shared/Asset'
import FormattedAmount from './shared/FormattedAmount'
import JSONButton from './shared/JSONButton'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'
import TransactionHash from './shared/TransactionHash'

import {base64Decode} from '../lib/utils'

const AccountCreated = ({account, startingBalance}) => (
  <span>
    <FormattedMessage id="account" />
    {': '}
    <AccountLink account={account} />
    {'; '}
    <FormattedMessage id="balance" />
    {': '}
    <FormattedAmount amount={startingBalance} />
  </span>
)

const AccountFlagsUpdated = ({
  authRequiredFlag = null,
  authRevocableFlag = null,
}) => (
  <span>
    <FormattedMessage id="flags" />
    {': '}
    {authRequiredFlag != null && (
      <span>auth_required_flag={String(authRequiredFlag)}; </span>
    )}
    {authRevocableFlag != null && (
      <span>auth_revocable_flag={String(authRevocableFlag)}</span>
    )}
  </span>
)

const AccountHomeDomainUpdated = ({homeDomain}) => (
  <span>
    <FormattedMessage id="home.domain" />
    {': '}
    <a href={`https://${homeDomain}`} target="_blank">
      {homeDomain}
    </a>
  </span>
)

const AccountRemoved = ({account}) => (
  <span>
    <FormattedMessage id="account" />
    {': '}
    {account}
  </span>
)

const Amount = ({
  amount,
  assetType,
  assetCode,
  assetIssuer,
  showLabel = true,
}) => (
  <span>
    {showLabel === true && (
      <span>
        <FormattedMessage id="amount" />
        {': '}
      </span>
    )}
    <FormattedAmount amount={amount} />{' '}
    <Asset code={assetCode} type={assetType} issuer={assetIssuer} />
  </span>
)

const AssetWrap = ({assetType, assetCode, assetIssuer}) => (
  <Asset code={assetCode} type={assetType} issuer={assetIssuer} />
)

const Data = ({op, type}) => {
  if (!op) return null
  return (
    <div>
      <div>
        <FormattedMessage id="key" />
        {': '}
        <span title={op.name}>{truncate(op.name)}</span>
      </div>

      {type !== 'data_removed' && (
        <div>
          <FormattedMessage id="value" />
          {': '}
          <span title={op.value}>{truncate(base64Decode(op.value))}</span>
        </div>
      )}
    </div>
  )
}

const SequenceBumped = ({newSeq}) => <span>{newSeq}</span>

const Signer = ({publicKey, weight}) => (
  <span>
    <FormattedMessage id="key.public" />
    {': '}
    <AccountLink account={publicKey} />
    {'; '} <FormattedMessage id="weight" />
    {': '}
    {weight}
  </span>
)

const Trade = ({
  boughtAmount,
  boughtAssetType,
  boughtAssetCode,
  boughtAssetIssuer,
  seller,
  soldAmount,
  soldAssetType,
  soldAssetCode,
  soldAssetIssuer,
}) => (
  <span>
    <FormattedMessage id="bought" />
    {': '}
    <Amount
      amount={boughtAmount}
      assetCode={boughtAssetCode}
      assetType={boughtAssetType}
      assetIssuer={boughtAssetIssuer}
      showLabel={false}
    />
    {'; '}
    <FormattedMessage id="sold" />
    {': '}
    <Amount
      amount={soldAmount}
      assetCode={soldAssetCode}
      assetType={soldAssetType}
      assetIssuer={soldAssetIssuer}
      showLabel={false}
    />
    {'; '}
    <FormattedMessage id="seller" />
    {': '}
    <AccountLink account={seller} />
  </span>
)

const Trustline = ({assetType, assetCode, assetIssuer, limit, trustor}) => (
  <span>
    <FormattedMessage id="asset" />
    {': '}
    <Asset
      code={assetCode}
      type={assetType}
      issuer={assetIssuer ? assetIssuer : trustor}
    />
    {limit && (
      <span>
        {'; '}
        <FormattedMessage id="limit" />
        {': '}
        {limit}
      </span>
    )}
  </span>
)

const Thresholds = ({lowThreshold, medThreshold, highThreshold}) => (
  <span>
    <FormattedMessage id="threshold.low" />
    {`: ${lowThreshold} / `}
    <FormattedMessage id="threshold.medium" />
    {`: ${medThreshold} / `}
    <FormattedMessage id="threshold.high" />
    {`: ${highThreshold}`}
  </span>
)

const effectTypeComponentMap = {
  account_created: AccountCreated,
  account_removed: AccountRemoved,
  account_credited: Amount,
  account_debited: Amount,
  account_thresholds_updated: Thresholds,
  account_home_domain_updated: AccountHomeDomainUpdated,
  account_flags_updated: AccountFlagsUpdated,
  sequence_bumped: SequenceBumped,
  signer_created: Signer,
  signer_removed: Signer,
  signer_updated: Signer,
  trustline_created: Trustline,
  trustline_removed: AssetWrap,
  trustline_updated: Trustline,
  trustline_authorized: Trustline,
  trustline_deauthorized: Trustline,
  offer_created: Offer,
  offer_removed: Offer,
  offer_updated: Offer,
  trade: Trade,
  data_created: Data,
  data_removed: Data,
  data_updated: Data,
}

const EffectDetails = ({effect, op}) => {
  const SubEffectComponent = effectTypeComponentMap[effect.type]
  if (!SubEffectComponent) return <span>{effect.type}</span>
  return <SubEffectComponent {...effect} op={op} />
}

class Effect extends React.Component {
  state = {op: null, txHash: null}

  componentDidMount() {
    this.props.effect.operation().then(op =>
      this.setState({
        op: op,
        txHash: op.transaction_hash,
      })
    )
  }

  /**
   * Given list of records from a horizon response, pick out the one for this
   * effect.
   */
  filterEffectsFn() {
    const effectId = this.props.effect.id
    return recordsArr => {
      const result = recordsArr.filter(({id}) => id === effectId)
      return result.length > 0 ? JSON.stringify(result[0], null, 2) : null
    }
  }

  render() {
    const {effect, effectURLFn, showAccount = true} = this.props

    const opId = this.state.op != null ? this.state.op.id : null

    return (
      <tr key={effect.id} id={effect.id} className="effect">
        {showAccount && (
          <td className="account-badge">
            <AccountLink account={effect.account} />
          </td>
        )}
        <td>{effect.type}</td>
        <td>
          <EffectDetails effect={effect} op={this.state.op} />
        </td>
        <td>
          {this.state.txHash != null && (
            <TransactionHash hash={this.state.txHash} compact={true} />
          )}
        </td>
        <td>
          <TimeSynchronisedFormattedRelative
            initialNow={this.props.parentRenderTimestamp}
            time={effect.createdAt}
          />
        </td>
        <td>
          <JSONButton
            url={`${effectURLFn(opId)}?limit=200&order=desc`}
            filterFn={this.filterEffectsFn()}
          />
        </td>
      </tr>
    )
  }
}

Effect.propTypes = {
  effect: propTypes.shape({
    id: propTypes.string.isRequired,
    links: propTypes.object.isRequired,
    account: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    created_at: propTypes.string,
  }).isRequired,
  effectURLFn: propTypes.func.isRequired,
  parentRenderTimestamp: propTypes.number,
}

export default Effect
