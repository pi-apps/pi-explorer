import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import has from 'lodash/has'
import {MuxedAccount} from 'stellar-sdk'

import knownAccounts from '../../data/known_accounts'
import {isMuxedAddress} from '../../lib/stellar/utils'
import {shortAddress} from '../../lib/utils'

const AccountLinkSimple = ({title, subPath, label, isSecondary = false}) => (
  <span title={title}
  >
    <Link 
  style={{backgroundColor: isSecondary ? 'white' :undefined}}
  to={`/account/${subPath}`}>{label} {isSecondary}</Link>
  </span>
)

const BaseAccountLink = ({address, label, hideKnown}) => {
  let accLabel
  if (label) {
    accLabel = label
  } else if (has(knownAccounts, address) && !hideKnown) {
    accLabel = <span style={{fontStyle: 'italic'}}>{knownAccounts[address].name}</span>
  } else {
    accLabel = shortAddress(address)
  }
  return (
    <AccountLinkSimple 
      title={`Base Address: ${address}`}
      subPath={address}
      label={accLabel}
    />
  )
}

const MuxedAccountLink = ({address, label, hideKnown}) => {
  const muxedAccount = MuxedAccount.fromAddress(address, '1')
  const publicAddress = muxedAccount.account.accountId()
  const muxedAddress = muxedAccount.accountId()
  const labelRendered = <span>{shortAddress(muxedAddress)}
    <span style={{fontSize: 'smaller'}}>
      {` [${shortAddress(publicAddress)}]`}
    </span>
  </span>
  return (
      <AccountLinkSimple
        // isSecondary="true"
        title={`Muxed Address: ${muxedAddress}`}
        subPath={muxedAddress}
        label={labelRendered}
      />
  )
}

const AccountLink = ({account, label, hideKnown = false}) => {
  if (isMuxedAddress(account)) {
    return (
      <MuxedAccountLink 
        address={account}
        label={label}
        hideKnown={hideKnown}
      />
    )
  } else  {
    return (
      <BaseAccountLink
        address={account}
        label={label}
        hideKnown={hideKnown}
      />
    )
  }
}

AccountLink.propTypes = {
  account: PropTypes.string.isRequired,
  hideKnown: PropTypes.bool,
  label: PropTypes.string,
}

export {AccountLink as default, BaseAccountLink, MuxedAccountLink}
