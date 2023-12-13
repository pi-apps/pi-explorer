import {
  isFederatedAddress,
  isMuxedAddress,
  isPublicKey,
  isTxHash,
  stroopsToLumens,
} from '../../stellar/utils'

it('stroopsToLumens converts correctly', () => {
  expect(stroopsToLumens(100)).toBe(0.00001)
  expect(stroopsToLumens(5000000)).toBe(0.5)
  expect(stroopsToLumens(5000000000)).toBe(500)
})

it('isPublicKey identifies a valid key', () => {
  expect(isPublicKey()).toBe(false)
  expect(isPublicKey('')).toBe(false)
  expect(isPublicKey(null)).toBe(false)

  // same length as valid key and looks valid but is not
  expect(
    isPublicKey('GBQHXMAVPD3AKY5PWFCBVT3NFIXGE345FVZLL4JXKTVSFT5FKMEV5QIX')
  ).toBe(false)

  // valid secret key is not a valid public key
  expect(
    isPublicKey('SA5OGCE2AQMSXCKYHGQZ3RUV2464W5M2QXBBAY2GSBRTFUUTKQI5UB2A')
  ).toBe(false)

  // valid
  expect(
    isPublicKey('GBQHXMAVPD3AKY5PWFCBVT3NFIXGE345FVZLL4JXKTVSFT5FKMEV5QIL')
  ).toBe(true)
})

it('isFederatedAddress identifies a valid stellar address', () => {
  expect(isFederatedAddress()).toBe(false)
  expect(isFederatedAddress('')).toBe(false)
  expect(isFederatedAddress(null)).toBe(false)

  expect(isFederatedAddress('comma,forbidden*stellar.org')).toBe(false)
  expect(isFederatedAddress('two*asterisk*stellar.org')).toBe(false)

  expect(isFederatedAddress('jed*stellar.org')).toBe(true)
  expect(isFederatedAddress('hatch1234*some-domain-888.a.b.c')).toBe(true)
})

it('isTxHash identifies a valid transaction hash', () => {
  expect(isTxHash()).toBe(false)
  expect(isTxHash('')).toBe(false)
  expect(isTxHash(null)).toBe(false)
  expect(isTxHash('ddefd')).toBe(false)

  expect(
    isTxHash('ddeff3d3b8455f8173ef4d63e6650625734207fd351d2b9eeeaf0e38ffe1064b')
  ).toBe(true)
})

it('isMuxedAddress identifies a valid key', () => {
  expect(isMuxedAddress()).toBe(false)
  expect(isMuxedAddress('')).toBe(false)
  expect(isMuxedAddress(null)).toBe(false)

  // same length as valid key and looks valid but is not
  expect(
    isMuxedAddress('MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4MX')
  ).toBe(false)

  // valid public key is not a valid mutex address
  expect(
    isMuxedAddress('GBQHXMAVPD3AKY5PWFCBVT3NFIXGE345FVZLL4JXKTVSFT5FKMEV5QIX')
  ).toBe(false)

  // valid
  expect(
    isMuxedAddress('MDZ464OWNGEL4X2DE6JPLEARO2WJ4AGCBN3XM7E4ZSLPHRBV6AZB6AAAAAAAAAAAAGW4M')
  ).toBe(true)
})

