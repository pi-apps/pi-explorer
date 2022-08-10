import React from 'react'
import Payment from './Payment'
import Asset from '../shared/Asset'
import {FormattedMessage} from 'react-intl'
const PathPayment = props => {
  const sourceAsset = (
    <Asset
      code={props.sourceAssetCode}
      issuer={props.sourceAssetIssuer}
      type={props.sourceAssetType}
    />
  )
  return (
    <Payment {...props}>
      <FormattedMessage
        id="operation.payment.path"
        values={{
          amount: props.sourceAmount,
          asset: sourceAsset,
        }}
      />
    </Payment>
  )
}
export default PathPayment
