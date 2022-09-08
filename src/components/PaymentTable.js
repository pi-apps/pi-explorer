import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage} from 'react-intl'
import filter from 'lodash/filter'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'

import Operation from './operations/Operation'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import {withPaging} from './shared/Paging'
import {withSpinner} from './shared/Spinner'
import CSVExport from './shared/CSVExport'

const PaymentTable = props =>(
  <div>
    <Table
      id="payment-table"
      className="table-striped table-hover table-condensed"
    >
      <thead>
        <tr>
          <th>
            <FormattedMessage id="account" />
          </th>
          <th>
            <FormattedMessage id="payment" />
          </th>
          {props.compact === false && (
            <th class="block-column">
              <FormattedMessage id="transaction" />
            </th>
          )}
          {props.compact === false && (
            <th class="block-column">
              <FormattedMessage id="type" />
            </th>
          )}
          <th>
            <FormattedMessage id="time" />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.records.map(payment => (
          <Operation
            key={payment.id}
            compact={props.compact}
            op={payment}
            opURLFn={props.server.opURL}
            parentRenderTimestamp={props.parentRenderTimestamp}
          />
        ))}
      </tbody>
    </Table>
    <div className="text-center" id="csv-export">
      <ExportToCSVComponent server={props.server} account={props.account} />
    </div>
  </div>
)

PaymentTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  server: PropTypes.object.isRequired,
}

const rspRecToPropsRec = record => {
  record.time = record.created_at
  return mapKeys(record, (v, k) => camelCase(k))
}

const fetchRecords = ({account, tx, limit, server}) => {
  const getBuilder = () => {
    const builder = server.payments()
    if (tx) builder.forTransaction(tx)
    if (account) builder.forAccount(account)
    builder.limit(limit)
    builder.order('desc')
    return builder
  }
  const filterForType = getOperationTypeFilter()
  if (filterForType) {
    return fetchUntilEnoughDataToDisplay(
      getBuilder,
      filterForType,
      limit,
      undefined,
      0,
      0,
      0
    )
  }
  return getBuilder().call()

}



const getOperationTypeFilter = () => {
  const opTypeFilter = window.location.search.match(/opTypeFilter=([a-z_]*)/)
  if (opTypeFilter && opTypeFilter[1]) {
    return opTypeFilter[1]
  }
}

let cursors = []
let currentCursor = 0
const fetchUntilEnoughDataToDisplay = (
  getBuilder,
  filterForType,
  limit,
  accumulatedRsp,
  totalFetchedRecs,
  cursor
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
    ) {
      return fetchUntilEnoughDataToDisplay(
        getBuilder,
        filterForType,
        limit,
        accumulatedRsp,
        totalFetchedRecs,
        cursor
      )
    } else {
      // there is no way for us to know how many occurrences exist for a
      // certain type. for example, somebody could create a filter for ops
      // of type 'foo'. if the total operations dataset is very large, but
      // contains only one record of type 'foo' then we would recursively need
      // to fetch the entire operations dataset, because we want to fill up
      // the page to the maximum of records and we don't know when to stop
      // fetching records.
      const lessRecordsThanLimitReady = accumulatedRsp.records.length < limit
      const isMoreDataAvailable = cursor !== 0
      if (
        totalFetchedRecs >= maxTotalRecordsToFetch &&
        isMoreDataAvailable &&
        lessRecordsThanLimitReady
      ) {
        this.possiblyMoreDataAvailable = true
      }

      // the prev cursor stays the same, but the next cursor has to be set for the
      // latest rsp.next, so that if the user presses next the filtering would
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
          undefined,
          0,
          newCursor
        )
      }

      accumulatedRsp.prev = (...props) => {
        if (records.length === 0) return Promise.resolve(rsp)

        let oldCursor = cursors.pop()
        return fetchUntilEnoughDataToDisplay(
          getBuilder,
          filterForType,
          limit,
          undefined,
          0,
          oldCursor
        )
      }

      return Promise.resolve(accumulatedRsp)
    }
  })
}
const callBuilder = props => props.server.payments()

const ExportToCSVComponent = withDataFetchingAllContainer(fetchRecords)(
  CSVExport
)

const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropsRec, callBuilder),
  withSpinner()
)

export default enhance(PaymentTable)
