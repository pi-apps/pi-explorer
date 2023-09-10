##  Stellar Explorer

A block explorer for the [Pi Blockchain](https://minepi.com) based on Chris Hatch' repository.

To use it, visit the Pi App [pi://blockchain.pi](pi://blockchain.pi) on the [Pi Browser](https://developers.minepi.com) or visit https://minepi.com/blockexplorer


## Exploring Private / Local Development Networks<a name="private-networks"></a>

It connects to a local horizon instance at http://localhost:8000 by default. If you are running a local private network for development this is quite handy for browsing your changes to the ledger.

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
https://github.com/pi-apps/pi-explorer/tree/master/src/languages

Submit pull requests with new languages or languages fixes if you like.

