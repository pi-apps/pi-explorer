import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage} from 'react-intl'
import filter from 'lodash/filter'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import {withPaging} from './shared/Paging'
import {withSpinner} from './shared/Spinner'
import {default as Operation, opTypes} from './operations/Operation'
import {filterFor} from './shared/OperationType'
import CSVExport from './shared/CSVExport'
const filterFn = event => {
  filterFor(event.target.value)
}
const OperationTable = props => (
  <div>
    {props.compact === false && (
      <div className="filter">
           <FormattedMessage id="filter.for-operation-type" />:
        <select onChange={filterFn} defaultValue={getOperationTypeFilter()}>
              <option />
          {opTypes.map(type => (
            <option>{type}</option>
          ))}
        </select>
             <br />
         {getOperationTypeFilter() && this.possiblyMoreDataAvailable && (
          <span className="disclaimer">
            <FormattedMessage id="filter.more-data-possibly-available" />
          </span>
	@@ -46,12 +46,12 @@ const OperationTable = props => (
      <thead>
        <tr>
          <th>
             <FormattedMessage id="account" />
          </th>
          <th>
             <FormattedMessage id="operation" />
          </th>
                 {props.compact === false && (
            <th>
              <FormattedMessage id="transaction" />
            </th>
	@@ -64,6 +64,7 @@ const OperationTable = props => (
          <th>
            <FormattedMessage id="time" />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
	@@ -74,7 +75,6 @@ const OperationTable = props => (
            op={op}
            opURLFn={props.server.opURL}
            parentRenderTimestamp={props.parentRenderTimestamp}
          />
        ))}
      </tbody>
	@@ -92,14 +92,11 @@ OperationTable.propTypes = {
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  server: PropTypes.object.isRequired,
}
const rspRecToPropsRec = record => {
  record.time = record.created_at
  return mapKeys(record, (v, k) => camelCase(k))
}
const fetchRecords = ({account, limit, server, tx, type}) => {
  const getBuilder = () => {
    const builder = server.operations()
	@@ -109,11 +106,10 @@ const fetchRecords = ({account, limit, server, tx, type}) => {
    builder.order('desc')
    return builder
  }
  // extract operation type filter from URI
  const filterForType = getOperationTypeFilter()
  if (filterForType) {
     return fetchUntilEnoughDataToDisplay(
      getBuilder,
      filterForType,
      limit,
	@@ -125,7 +121,6 @@ const fetchRecords = ({account, limit, server, tx, type}) => {
  }
  return getBuilder().call()
}
const getOperationTypeFilter = () => {
  const opTypeFilter = window.location.search.match(/opTypeFilter=([a-z_]*)/)
  if (opTypeFilter && opTypeFilter[1]) {
	@@ -145,25 +140,24 @@ const fetchUntilEnoughDataToDisplay = (
) => {
  const builder = cursor ? getBuilder().cursor(cursor) : getBuilder()

    return builder.call().then(rsp => {
    const records = rsp.records
    totalFetchedRecs += records.length
          const filteredRecs = filter(records, rec => rec.type === filterForType)

    if (!accumulatedRsp) {
      accumulatedRsp = rsp
      accumulatedRsp.records = []
    }
    accumulatedRsp.records = accumulatedRsp.records.concat(filteredRecs)

    const index = records.length - 1
      let cursor =
      records.length > 0 && index >= 0 ? records[index].paging_token : 0

    // recursively request more until limit is reached
    const maxTotalRecordsToFetch = 400
      if (
      accumulatedRsp.records.length < limit &&
      records.length > 0 &&
      totalFetchedRecs < maxTotalRecordsToFetch
	@@ -186,7 +180,7 @@ const fetchUntilEnoughDataToDisplay = (
      // fetching records.
      const lessRecordsThanLimitReady = accumulatedRsp.records.length < limit
      const isMoreDataAvailable = cursor !== 0
          if (
        totalFetchedRecs >= maxTotalRecordsToFetch &&
        isMoreDataAvailable &&
        lessRecordsThanLimitReady
	@@ -199,12 +193,10 @@ const fetchUntilEnoughDataToDisplay = (
      // continue from where we stopped last.
      accumulatedRsp.next = (...props) => {
        if (records.length === 0) return Promise.resolve(rsp)
        cursors.push(currentCursor)
        const newCursor = records[records.length - 1].paging_token
        currentCursor = newCursor
           return fetchUntilEnoughDataToDisplay(
          getBuilder,
          filterForType,
          limit,
	@@ -218,7 +210,7 @@ const fetchUntilEnoughDataToDisplay = (
        if (records.length === 0) return Promise.resolve(rsp)

        let oldCursor = cursors.pop()
           return fetchUntilEnoughDataToDisplay(
          getBuilder,
          filterForType,
          limit,
	@@ -234,7 +226,6 @@ const fetchUntilEnoughDataToDisplay = (
}

const callBuilder = props => props.server.operations()
const ExportToCSVComponent = withDataFetchingAllContainer(fetchRecords)(
  CSVExport
)
	@@ -244,5 +235,4 @@ const enhance = compose(
  withDataFetchingContainer(fetchRecords, rspRecToPropsRec, callBuilder),
  withSpinner()
)
export default enhance(OperationTable)
