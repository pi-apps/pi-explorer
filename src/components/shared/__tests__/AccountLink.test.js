import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import knownAccounts from '../../../data/known_accounts'
import AccountLink, {BaseAccountLink} from '../AccountLink'

configure({adapter: new Adapter()})

const ACC_KNOWN = Object.keys(knownAccounts).find(
  (key) => knownAccounts[key].displayName === 'NaoBTC'
)
const ACC_UNKNOWN = 'GCGG3CIRBG2TTBR4HYZJ7JLDRFKZIYOAHFXRWLU62CA2QN52P2SUQNPJ'
const LABEL = 'Anchor'

describe('AccountLink', () => {
  it('renders with label', () => {
    const link = shallow(<AccountLink label={LABEL} account={ACC_UNKNOWN} />)
    expect(link.getElements()).toMatchInlineSnapshot(`
Array [
  <BaseAccountLink
    address="GCGG3CIRBG2TTBR4HYZJ7JLDRFKZIYOAHFXRWLU62CA2QN52P2SUQNPJ"
    hideKnown={false}
    label="Anchor"
  />,
]
`)
  })

  it('renders short account for label when no label property', () => {
    const link = shallow(<AccountLink account={ACC_UNKNOWN} />)
    expect(link.getElements()).toMatchInlineSnapshot(`
Array [
  <BaseAccountLink
    address="GCGG3CIRBG2TTBR4HYZJ7JLDRFKZIYOAHFXRWLU62CA2QN52P2SUQNPJ"
    hideKnown={false}
  />,
]
`)
  })

  it('renders anchor name in italics if account a known anchor', () => {
    const link = shallow(<BaseAccountLink address={ACC_KNOWN} />)
    expect(link.getElements()).toMatchInlineSnapshot(`
Array [
  <AccountLinkSimple
    label={
      <span
        style={
          Object {
            "fontStyle": "italic",
          }
        }
      >
        NaoBTC
      </span>
    }
    subPath="GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH"
    title="Base Address: GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH"
  />,
]
`)
  })
})

describe('MuxedAccount', () => {
  it.todo('muxed account renders muxed and base')
})
