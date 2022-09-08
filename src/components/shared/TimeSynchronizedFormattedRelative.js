import {FormattedRelative} from 'react-intl'

/**
 * A variation on FormattedRelative that respects updates to the initialNow 
 * property. see react-intl for the default behaviour.
 
 * This version allows synchronisation of multiple FormattedRelative time 
 * components that were created at various times to a single baseline now value.
 */
// export default class extends FormattedRelative {
//   componentWillReceiveProps({initialNow: nextNow}) {
//     this.setState({now: nextNow})
//   }
// }
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const TimeSynchronizedFormattedRelative = ({hash,time}) => {
  return (
    <span title={hash}>
      { hash ? <Link to={`/tx/${hash}`} ><FormattedRelative value={time} /></Link>
      : <FormattedRelative value={time} />}
    </span>
  )
}

TimeSynchronizedFormattedRelative.propTypes = {
  hash: PropTypes.string,
  time: PropTypes.string,
}
export default TimeSynchronizedFormattedRelative