const networks = {
  public: 'public',
  test: 'testnet',
  local: 'local',
}

const hostnameToNetworkType = hostname => {
  if (hostname === 'steexp.com' || hostname === 'publicnet.local')
    return networks.public
  else if (hostname === 'testnet.steexp.com' || hostname === 'testnet.local')
    return networks.test
  else return networks.local
}

export {networks as default, hostnameToNetworkType}
