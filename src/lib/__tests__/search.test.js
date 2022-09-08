import {searchStrToPath} from '../search'

const notFound = str => `/error/not-found/${str}`

describe('searchStrToPath', () => {
  it('returns null for empty input', () => {
    expect(searchStrToPath()).toBeNull()
    expect(searchStrToPath(null)).toBeNull()
    expect(searchStrToPath('')).toBeNull()
    expect(searchStrToPath('\t')).toBeNull()
    expect(searchStrToPath('  ')).toBeNull()
  })

  it('returns null for malformed input', () => {
    expect(searchStrToPath('5a2114b123f')).toEqual(notFound('5a2114b123f'))
    expect(searchStrToPath('GDCX3FBHR7A')).toEqual(notFound('GDCX3FBHR7A'))
    expect(searchStrToPath('not@federated.form')).toEqual(
      notFound('not@federated.form')
    )
    expect(searchStrToPath('not.federated.form')).toEqual(
      notFound('not.federated.form')
    )
  })

  it('returns /block for numbers', () => {
    expect(searchStrToPath('3')).toEqual('/block/3')
    expect(searchStrToPath('4567890')).toEqual('/block/4567890')
  })

  it('returns /tx for transaction hashes', () => {
    expect(
      searchStrToPath(
        '5a2114b123f7128c37f84004f5cf54b11c1ba38daeebc7295a2a1cd67ddd0482'
      )
    ).toEqual(
      '/tx/5a2114b123f7128c37f84004f5cf54b11c1ba38daeebc7295a2a1cd67ddd0482'
    )
  })

  it('returns /account for public keys', () => {
    expect(
      searchStrToPath(
        'GDCX3FBHR7IKHSDFDCA4XY65NF6B2WMF5WR67FIXN5JXURJ3YDGSU2BS'
      )
    ).toEqual(
      '/account/GDCX3FBHR7IKHSDFDCA4XY65NF6B2WMF5WR67FIXN5JXURJ3YDGSU2BS'
    )
  })

  it('returns /account for federated addresses', () => {
    expect(searchStrToPath('steexp*fed.network')).toEqual(
      '/account/steexp*fed.network'
    )
  })

  it('returns /account/<issuer> for matching asset codes', () => {
    expect(searchStrToPath('MOBI')).toEqual('/asset/MOBI')
    expect(searchStrToPath('JPY')).toEqual('/asset/JPY')
  })

  it('returns /anchor/<domain> for matching anchor substrings', () => {
    expect(searchStrToPath('bear')).toEqual('/anchor/vcbear.net')
    expect(searchStrToPath('fox')).toEqual('/anchor/ripplefox.com')
  })
})
