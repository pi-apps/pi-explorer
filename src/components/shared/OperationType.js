import React from 'react'
import PropTypes from 'prop-types'
import {shortHash} from '../../lib/utils'

const filterFor = (type) => {
  window.location.href = window.location.pathname + '?opTypeFilter=' + type + window.location.hash
}

const OperationType = ({type, compact = true}) => {
  const hashLabel = compact ? shortHash(type) : type
  const className = !compact ? 'monospace' : ''
  const fn = (event) => {
    event.preventDefault()
    filterFor(type)
  }
  return (
    <span title={type} className={className}>
      <a href="/" onClick={fn}>{hashLabel}</a>
    </span>
  )
}
OperationType.propTypes = {
  type: PropTypes.string.isRequired,
  compact: PropTypes.bool,
}

export {OperationType as default, filterFor}
