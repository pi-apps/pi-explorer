import React from 'react'
import {networks} from '../../lib/stellar'

const NetworkButton = ({networkType, selectedNetworkType, switchNetworkType}) =>
  <button
    className={networkType === selectedNetworkType ? 'is-active' : 'is-inactive'}
    // onClick={e => switchNetworkType(networkType)}
  >
    {networkType.toUpperCase()}
  </button>

const NetworkSelector = props =>
  <div className="Network-Selector">
    {<NetworkButton
        key={networks.test}
        networkType={networks.test}
        selectedNetworkType={props.networkType}
        switchNetworkType={props.switchNetworkType}
      />
    }
  </div>

export default NetworkSelector
