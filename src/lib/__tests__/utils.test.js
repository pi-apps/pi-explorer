import {
  assetKeyToIssuer,
  base64Decode,
  formatAmount,
  isDefInt,
  shortAddress,
  shortHash,
} from '../utils'

it('assetKeyToIssuer extracts correctly', () => {
  expect(
    assetKeyToIssuer(
      'NGN-GCLRUZDCWBHS7VIFCT43BARPP63BHR32HMEVKXYQODA5BU6SIGFK4HL2'
    )
  ).toBe('GCLRUZDCWBHS7VIFCT43BARPP63BHR32HMEVKXYQODA5BU6SIGFK4HL2')
  expect(
    assetKeyToIssuer(
      'MOBI-GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH'
    )
  ).toBe('GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH')
})

it('isDefInt checks for defined int correctly', () => {
  expect(isDefInt()).toBe(false)
  expect(isDefInt('')).toBe(false)
  expect(isDefInt(null)).toBe(false)

  expect(isDefInt({})).toBe(false)
  expect(isDefInt({}, 'x')).toBe(false)
  expect(isDefInt({y: 1}, 'x')).toBe(false)

  expect(isDefInt({x: undefined}, 'x')).toBe(false)
  expect(isDefInt({x: 'string'}, 'x')).toBe(false)

  expect(isDefInt({x: 1}, 'x')).toBe(true)
  expect(isDefInt({x: 12345678901234567890}, 'x')).toBe(true)
})

it('shortAddress shortens address', () => {
  expect(
    shortAddress(
      'GDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6CER'
    )
  ).toBe('GDZ4')
  expect(
    shortAddress(
      'MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M'
    )
  ).toBe('MDZ4')
})

it('shortHash shortens hash', () => {
  expect(
    shortHash(
      'ddeff3d3b8455f8173ef4d63e6650625734207fd351d2b9eeeaf0e38ffe1064b'
    )
  ).toBe('ddeff3d...')
})

it('base64Decode decodes', () => {
  expect(base64Decode('aW5kb25lc2lhbg==')).toBe('indonesian')
  expect(base64Decode('6ams6ams6JmO6JmO')).toBe('马马虎虎')
})

it('formatAmount strips trailling 0s after decimal only', () => {
  const expectUnchanged = amount => expect(formatAmount(amount)).toBe(amount)

  expectUnchanged('0')
  expectUnchanged('1')
  expectUnchanged('100')
  expectUnchanged('0.1')
  expectUnchanged('0.0000001')
  expectUnchanged('100.1')
  expectUnchanged('1234567.1234567')
  expectUnchanged('12345678901234567890.1234567')

  const expectFmt = (amount, newAmount) =>
    expect(formatAmount(amount)).toBe(newAmount)

  expectFmt('1.00000', '1')
  expectFmt('1.10', '1.1')
  expectFmt('1.002000', '1.002')
  expectFmt('100.0', '100')
})
