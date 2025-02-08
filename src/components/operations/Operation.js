import React from 'react'
import PropTypes from 'prop-types'

import {shortAddress} from '../../lib/utils'

import AccountLink from '../shared/AccountLink'
import JSONButton from '../shared/JSONButton'
import TimeSynchronisedFormattedRelative from '../shared/TimeSynchronizedFormattedRelative'
import TransactionHash from '../shared/TransactionHash'
import OperationType from '../shared/OperationType'

import AccountMerge from './AccountMerge'
import AllowTrust from './AllowTrust'
import BumpSequence from './BumpSequence'
import ChangeTrust from './ChangeTrust'
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
}

const opTypes = Object.keys(opTypeComponentMap)

const SubOperation = ({op}) => {
  const SubOpComponent = opTypeComponentMap[op.type] || Unrecognized
  return <SubOpComponent {...op} />
}

const Operation = ({compact, op, opURLFn, parentRenderTimestamp, is_transaction}) => {
  let opAccount
  
  if (op.fromMuxed) {
    opAccount = op.fromMuxed
  } else if (op.from) {
    opAccount = op.from
  } else if (op.sourceAccountMuxed) {
    opAccount = op.sourceAccountMuxed
  } else {
    opAccount = op.sourceAccount
  }

  const acc =
    op.type !== 'account_merge' ? (
      <AccountLink account={opAccount} />
    ) : (
      <span title={opAccount}>{shortAddress(opAccount)}</span>
    )

  return (
    <tr key={op.id} className="operation">
      <td className="account-badge">{acc}</td>
      <td>
        <SubOperation op={op} />

      </td>
      {compact === false && (
        <td class = "block-column">
          <TransactionHash hash={op.transactionHash} compact={true} />
        </td>
      )}
      {compact === false && (
        <td class = "block-column">
          <OperationType
            type={op.type}
            compact={false}
          />
        </td>
      )}
      <td > 
        <span title={op.time}>
          <TimeSynchronisedFormattedRelative
            // initialNow={parentRenderTimestamp}
            time={op.time}
            hash={op.transactionHash}
          />
        </span>
      </td>
      {is_transaction === true &&(
        <td class>
          <JSONButton url={opURLFn(op.id)} />
        </td>
      )}
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
  is_transaction: PropTypes.bool,
}

export {Operation as default, opTypes}
