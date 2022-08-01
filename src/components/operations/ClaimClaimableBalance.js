import React from 'react'
import {FormattedMessage} from 'react-intl'

import AccountLink from '../shared/AccountLink'

const FormattedBalanceId = ({balanceId}) => balanceId.replace(/^0*/, '')

const ClaimClaimableBalance = ({balanceId, claimant}) => {
  return (
    <FormattedMessage
      id="operation.claimable.claim"
      values={{
        claimant: <AccountLink account={claimant} />,
        balanceId: <FormattedBalanceId balanceId={balanceId} />,
      }}
    />
  )
}

export default ClaimClaimableBalance
