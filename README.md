# Stellar Explorer

[![Build Status](https://travis-ci.com/chatch/stellarexplorer.svg?branch=master)](https://travis-ci.com/chatch/stellarexplorer)

A ledger explorer for [Stellar](https://stellar.org).

Public: https://steexp.com
Test: https://testnet.steexp.com
Local: http://localhost:3000

## Resources

### Lists

| Resource     | URI                                          |
| ------------ | -------------------------------------------- |
| Operations   | [/operations](https://steexp.com/operations) |
| Transactions | [/txs](https://steexp.com/txs)               |
| Ledgers      | [/ledgers](https://steexp.com/ledgers)       |
| Payments     | [/payments](https://steexp.com/payments)     |
| Trades       | [/trades](https://steexp.com/trades)         |
| Effects      | [/effects](https://steexp.com/effects)       |

### Directory

| Resource  | URI                                        |
| --------- | ------------------------------------------ |
| Assets    | [/assets](https://steexp.com/assets)       |
| Anchors   | [/anchors](https://steexp.com/anchors)     |
| Exchanges | [/exchanges](https://steexp.com/exchanges) |

### Accounts

| Resource             | URI |
| -------------------- | --- |
| by Federated address | [/account/stellar\*fed.network](https://steexp.com/account/stellar*fed.network) |
| by Public address    | [/account/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX](https://steexp.com/account/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX) |
| by Multiplexed address    | [/account/MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M](https://steexp.com/account/MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M) |

#### Tabs

| Resource         | URI                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Balances Tab     | [/account/stellar\*fed.network#balances](https://steexp.com/account/stellar*fed.network#balances)         |
| Payments Tab     | [/account/stellar\*fed.network#payments](https://steexp.com/account/stellar*fed.network#payments)         |
| Offers Tab       | [/account/stellar\*fed.network#offers](https://steexp.com/account/stellar*fed.network#offers)             |
| Trades Tab       | [/account/stellar\*fed.network#trades](https://steexp.com/account/stellar*fed.network#trades)             |
| Effects Tab      | [/account/stellar\*fed.network#effects](https://steexp.com/account/stellar*fed.network#effects)           |
| Operations Tab   | [/account/stellar\*fed.network#operations](https://steexp.com/account/stellar*fed.network#operations)     |
| Transactions Tab | [/account/stellar\*fed.network#transactions](https://steexp.com/account/stellar*fed.network#transactions) |
| Signing Tab      | [/account/stellar\*fed.network#signing](https://steexp.com/account/stellar*fed.network#signing)           |
| Flags Tab        | [/account/stellar\*fed.network#flags](https://steexp.com/account/stellar*fed.network#flags)               |
| Data Tab         | [/account/stellar\*fed.network#data](https://steexpcom/account/stellar*fed.network#data)                  |

### Search

| Resource              | URI |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Federated address     | [/search/steexp\*fed.network](https://steexp.com/search/steexp*fed.network) |
| Public address        | [/search/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX](https://steexp.com/search/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX) |
| Multiplexed address        | [/search/MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M](https://steexp.com/search/MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M) |
| Ledger                | [/search/10000000](https://steexp.com/search/10000000) |
| Transaction           | [/search/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071](https://steexp.com/search/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071) |
| Asset Code            | [/search/NGN](https://steexp.com/search/NGN) |
| Anchor Name           | [/search/ripplefox](https://steexp.com/search/ripplefox) |
| Anchor Name (Partial) | [/search/fox](https://steexp.com/search/fox) |

### Misc

| Resource    | URI |
| ----------- | --- |
| Transaction | [/tx/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071](https://steexp.com/tx/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071) |
| Ledger      | [/ledger/10000000](https://steexp.com/ledger/10000000) |
| Anchor      | [/anchor/apay.io](https://steexp.com/anchor/apay.io) |
| Asset       | [/asset/NGN](https://steexp.com/asset/NGN) |

## Exploring Private / Local Development Networks<a name="private-networks"></a>

steexp will connect to a local horizon instance at http://localhost:8000 by default. If your running a local private network for development this is quite handy for browsing your changes to the ledger.

Alternatively you can run locally connecting to the testnet or public network horizon instances. To do this define these aliases to localhost:

```
127.0.1.1  testnet.local     # for steexp use testnet horizon
127.0.1.1  publicnet.local   # for steexp use mainnet horizon
```

Navigate to http://testnet.local:3000 or http://publicnet.local:3000 to select the network your interesting in exploring.

## Development

See the section [Exploring Private / Local Development Networks](#private-networks) for connecting to different backend networks. By default steexp will look for a local instance of horizon.

Start:

```
npm i && npm start
```

Test:

```
npm i && npm test
```

Build:

```
npm i && npm run build
```

## Languages

Use the language selector in the top right corner to change the language.

Translation files are here:
https://github.com/chatch/stellarexplorer/tree/master/src/languages

Submit pull requests with new languages or languages fixes there.
