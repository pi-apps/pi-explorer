export default [
  {
    _links: {
      self: {
        href: 'https://horizon.stellar.org/operations/92853980303990785',
      },
      transaction: {
        href:
          'https://horizon.stellar.org/transactions/35e241e71a4769f94ed51b224c09f2cf9997e48c9b976674e3ccdf756c1a33cd',
      },
      effects: {
        href:
          'https://horizon.stellar.org/operations/92853980303990785/effects',
      },
      succeeds: {
        href:
          'https://horizon.stellar.org/effects?order=desc\u0026cursor=92853980303990785',
      },
      precedes: {
        href:
          'https://horizon.stellar.org/effects?order=asc\u0026cursor=92853980303990785',
      },
    },
    id: '92853980303990785',
    paging_token: '92853980303990785',
    source_account: 'GALUJVTISLHBRDI3LYYMQFFIAILACUUZKIOLYWNDJEEYWECUQQNYQGOX',
    type: 'path_payment',
    type_i: 2,
    created_at: '2018-12-23T18:34:02Z',
    transaction_hash:
      '35e241e71a4769f94ed51b224c09f2cf9997e48c9b976674e3ccdf756c1a33cd',
    asset_type: 'credit_alphanum4',
    asset_code: 'BTC',
    asset_issuer: 'GBSTRH4QOTWNSVA6E4HFERETX4ZLSR3CIUBLK7AXYII277PFJC4BBYOG',
    from: 'GALUJVTISLHBRDI3LYYMQFFIAILACUUZKIOLYWNDJEEYWECUQQNYQGOX',
    to: 'GALUJVTISLHBRDI3LYYMQFFIAILACUUZKIOLYWNDJEEYWECUQQNYQGOX',
    amount: '0.0282862',
    path: [
      {
        asset_type: 'credit_alphanum4',
        asset_code: 'LTC',
        asset_issuer:
          'GCSTRLTC73UVXIYPHYTTQUUSDTQU2KQW5VKCE4YCMEHWF44JKDMQAL23',
      },
      {
        asset_type: 'credit_alphanum4',
        asset_code: 'USD',
        asset_issuer:
          'GBSTRUSD7IRX73RQZBL3RQUH6KS3O4NYFY3QCALDLZD77XMZOPWAVTUK',
      },
    ],
    source_amount: '0.0282762',
    source_max: '0.0282862',
    source_asset_type: 'credit_alphanum4',
    source_asset_code: 'BTC',
    source_asset_issuer:
      'GBSTRH4QOTWNSVA6E4HFERETX4ZLSR3CIUBLK7AXYII277PFJC4BBYOG',
  },
]
