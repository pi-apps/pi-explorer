import React from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'
import Asset from '../shared/Asset'
import AccountLink from '../shared/AccountLink'
import FormattedAmount from '../shared/FormattedAmount'

const Payment = ({
  amount,
  assetCode,
  assetIssuer,
  assetType,
  children,
  to,
  toMuxed,
}) => (
  <span>
    <FormattedMessage
      id="operation.payment"
      values={{
        amount: <FormattedAmount amount={amount} />,
        asset: <Asset code={assetCode} issuer={assetIssuer} type={assetType} />,
        recipient: <AccountLink account={toMuxed ? toMuxed : to} />,
      }}
    />
    {children}
  </span>
)

Payment.propTypes = {
  amount: PropTypes.string.isRequired,
  assetCode: PropTypes.string,
  assetIssuer: PropTypes.string,
  assetType: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  toMuxed: PropTypes.string,
}

export default Payment
