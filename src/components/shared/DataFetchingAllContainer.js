import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import extend from 'lodash/extend'
import has from 'lodash/has'
import mapKeys from 'lodash/mapKeys'
import omit from 'lodash/omit'
import {withServer} from './HOCs'
import {handleFetchDataFailure} from '../../lib/utils'
import {exportCSV} from '../../lib/csv'
// there is a hard limitation of how many records can be exported.
// this limitation is here to prevent browser memory overload and
// the export from running extremely long (e.g. because someone
// accidentally tries to export all of horizon).
const EXPORT_LIMIT = 20000
const propTypesContainer = {
  limit: PropTypes.number,
  page: PropTypes.number,
  usePaging: PropTypes.bool,
  refresh: PropTypes.bool,
  server: PropTypes.object,
}
/**
 * Wrap a component with Horizon data fetching abilities.
 * @param fetchDataFn {Function => Promise} Function that makes a call to the
 *          server requesting the required data. Returns a Promise resolving to
 *          the result data.
 * @param rspRecToPropsRecFn {Function} Converts from server response record
 *          format to some other format that the consuming container expects.
  */
const withDataFetchingAllContainer = fetchDataFn => Component => {
  const rspRecToPropsRecFn = record => {
    record = mapKeys(record, (v, k) => camelCase(k))
    return omit(record, ['links', 'pagingToken'])
  }
  const dataFetchingContainerClass = class extends React.Component {
    static defaultProps = {
      limit: 100,
      page: 0,
      refresh: false,
      usePaging: false,
    }
    state = {
      cursor: 0,
      wasExportStarted: false,
      isExportingFinished: false,
      exportLimitExceeded: false,
      fetchedRecords: [],
    }

    componentDidMount() {
            this.fetchDataFn = state => {
        this.fetchData(state.next())
      }
    }
    componentWillUnmount() {
      this.fetchDataFn = null
    }
    /*
     * This function fetches the entire dataset recursively.
     */
    fetchData(fetchDataPromise) {
      fetchDataPromise
        .then(r => this.responseToState(r))
        .then(newState => {
          this.setState(newState)
          return null
        })
        .then(() => {
            const exportLimitExceeded =
            this.state.fetchedRecords.length >= EXPORT_LIMIT
          const endReached =
            this.state.cursor === 0 && this.state.fetchedRecords.length > 0
          if (endReached || exportLimitExceeded) {
            exportCSV(this.state.fetchedRecords)
            var newState = {isExportingFinished: true, exportLimitExceeded}
            this.setState(newState)
                return
          }

              const isEndReached =
            this.state.cursor === 0 && this.state.fetchedRecords.length === 0
          if (this.state.wasExportStarted && isEndReached) {
            this.setState({isExportingFinished: true})
            return
          }

           if (
            this.state.wasExportStarted &&
            this.fetchDataFn !== null &&
            this.state.cursor !== 0
	@@ -108,7 +99,6 @@ const withDataFetchingAllContainer = fetchDataFn => Component => {
          this.setState({wasExportStarted: false})
        })
    }
    responseToState(rsp) {
      const cursor =
        rsp.records.length > 0 && has(rsp.records[0], 'paging_token')
	@@ -117,18 +107,16 @@ const withDataFetchingAllContainer = fetchDataFn => Component => {
      if (cursor === 0) {
        console.warn('no cursor')
      }
      return {
        next: rsp.next,
        prev: rsp.prev,
          fetchedRecords: this.state.fetchedRecords.concat(
          rsp.records.map(rspRecToPropsRecFn)
        ),
        cursor,
        parentRenderTimestamp: Date.now(),
      }
    }
    render() {
      return (
        <div>
	@@ -139,7 +127,6 @@ const withDataFetchingAllContainer = fetchDataFn => Component => {
            onClick={() => {
              const newState = {limit: 100, wasExportStarted: true}
              this.setState(newState)
              var initial = extend({}, this.props, newState)
              this.fetchData(fetchDataFn(initial))
            }}
	@@ -151,10 +138,7 @@ const withDataFetchingAllContainer = fetchDataFn => Component => {
      )
    }
  }
  dataFetchingContainerClass.propTypes = propTypesContainer
  return withServer(dataFetchingContainerClass)
}
export {withDataFetchingAllContainer}
