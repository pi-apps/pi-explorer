import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import toNumber from 'lodash/toNumber'
import {sdk} from './stellar'

import {
  isFederatedAddress,
  isMuxedAddress,
  isPublicKey,
  isSecretKey,
  isTxHash,
} from './stellar/utils'
import directory from '../data/directory'

const {anchors, assets} = directory

const lcEquals = (str1, str2) =>
  !isEmpty(str1) && !isEmpty(str2) && str1.toLowerCase() === str2.toLowerCase()

const lcIncludes = (str1, str2) =>
  !isEmpty(str1) &&
  !isEmpty(str2) &&
  str1.toLowerCase().includes(str2.toLowerCase())

const searchAssetCode = code =>
  Object.keys(assets)
    .filter(key => lcEquals(assets[key].code, code.toUpperCase()))
    .map(key => assets[key])

const searchAnchorName = name =>
  Object.keys(anchors).filter(
    key =>
      lcIncludes(anchors[key].name, name) ||
      lcIncludes(anchors[key].displayName, name)
  )

const searchStrToPath = searchStr => {
  if (!isString(searchStr) || searchStr.trim() === '') return null

  const str = searchStr.trim()

  if (isPublicKey(str) || isFederatedAddress(str) || isMuxedAddress(str)) {
    return `/account/${str}`
  } else if (isTxHash(str)) {
    return `/tx/${str}`
  } else if (!isNaN(toNumber(str))) {
    return `/block/${toNumber(str)}`
  } else if (isSecretKey(str)) {
    const kp = sdk.Keypair.fromSecret(str)
    return `/account/${kp.publicKey()}`
  }

  // search by asset code
  const codeMatch = searchAssetCode(str)
  if (codeMatch.length > 0) {
    return `/asset/${str.toUpperCase()}`
  }

  // search by anchor name (exact or substring)
  const nameMatch = searchAnchorName(str)
  if (nameMatch.length > 0) {
    return `/anchor/${nameMatch[0]}`
  }

  return `/error/not-found/${searchStr}`
}

export {searchStrToPath}
