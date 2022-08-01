import React from 'react'
import PropTypes from 'prop-types'

import AccountLink from '../shared/AccountLink'
import JSONButton from '../shared/JSONButton'
import TimeSynchronisedFormattedRelative from '../shared/TimeSynchronizedFormattedRelative'
import TransactionHash from '../shared/TransactionHash'
import OperationType from '../shared/OperationType'

import AccountMerge from './AccountMerge'
import AllowTrust from './AllowTrust'
import BumpSequence from './BumpSequence'
import ChangeTrust from './ChangeTrust'
import ClaimClaimableBalance from './ClaimClaimableBalance'
import CreateAccount from './CreateAccount'
import Inflation from './Inflation'
import ManageData from './ManageData'
import Offer from './Offer'
import PathPayment from './PathPayment'
import Payment from './Payment'
import SetOptions from './SetOptions'
import Unrecognized from './Unrecognized'

const opTypeComponentMap = {
  account_merge: AccountMerge,
  allow_trust: AllowTrust,
  bump_sequence: BumpSequence,
  change_trust: ChangeTrust,
  create_account: CreateAccount,

  create_passive_sell_offer: Offer,
  create_passive_offer: Offer, // < Protocol 11

  inflation: Inflation,
  manage_data: ManageData,

  manage_buy_offer: Offer,
  manage_sell_offer: Offer,
  manage_offer: Offer, // < Protocol 11
  
  path_payment_strict_send: PathPayment,
  path_payment_strict_receive: PathPayment,
  path_payment: PathPayment,  // < Protocol 12
  
  payment: Payment,
  set_options: SetOptions,

  create_claimable_balance: ClaimClaimableBalance,
  
  // TODO: handle these operation types (#238):

  // claim_claimable_balance
  // begin_sponsoring_future_reserves
  // end_sponsoring_future_reserves
  // revoke_sponsorship
}

const opTypes = Object.keys(opTypeComponentMap)

const SubOperation = ({op}) => {
  opTypeComponentMap[op.type] || console.log(JSON.stringify(op, null, 2))
  const SubOpComponent = opTypeComponentMap[op.type] || Unrecognized
  return <SubOpComponent {...op} />
}

const Operation = ({compact, op, opURLFn, parentRenderTimestamp}) => {
  const acc =
    op.type !== 'account_merge' ? (
      <AccountLink account={op.sourceAccount} />
    ) : (
      <span title={op.sourceAccount}>{op.sourceAccount.substring(0, 4)}</span>
    )

  return (
    <tr key={op.id} className="operation">
      <td className="account-badge">{acc}</td>
      <td>
        <SubOperation op={op} />
      </td>
      {compact === false && (
        <td>
          <TransactionHash hash={op.transactionHash} compact={true} />
        </td>
      )}
      {compact === false && (
        <td>
          <OperationType
            account={op.sourceAccount}
            type={op.type}
            compact={false}
          />
        </td>
      )}
      <td>
        <span title={op.time}>
          <TimeSynchronisedFormattedRelative
            initialNow={parentRenderTimestamp}
            value={op.time}
          />
        </span>
      </td>
      <td>
        <JSONButton url={opURLFn(op.id)} />
      </td>
    </tr>
  )
}

Operation.defaultProps = {
  compact: true,
}

Operation.propTypes = {
  compact: PropTypes.bool,
  op: PropTypes.shape({
    id: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired,
    sourceAccount: PropTypes.string.isRequired,
    type: PropTypes.oneOf(opTypes).isRequired,
    time: PropTypes.string,
  }).isRequired,
  opURLFn: PropTypes.func.isRequired,
  parentRenderTimestamp: PropTypes.number,
}

export {Operation as default, opTypes}
