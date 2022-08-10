import React from 'react'
import {compose} from 'recompose'
import {withPaging} from './shared/Paging'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import {isDefInt, isPublicKey} from '../lib/utils'
import TransactionTable from './TransactionTable'
import CSVExport from './shared/CSVExport'
const rspRecToPropsRec = rspRec => {
  return {
    hash: rspRec.hash,
	@@ -17,7 +15,6 @@ const rspRecToPropsRec = rspRec => {
    time: rspRec.created_at,
  }
}
const fetchRecords = props => {
  const builder = props.server.transactions()
  if (isDefInt(props, 'ledger')) builder.forLedger(props.ledger)
	@@ -26,21 +23,17 @@ const fetchRecords = props => {
  builder.order('desc')
  return builder.call()
}
const callBuilder = props => props.server.transactions()
const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropsRec, callBuilder)
)
const ExportToCSVComponent = withDataFetchingAllContainer(fetchRecords)(
  CSVExport
)
const wrapHOC = Component => props => (
  <div>
      <div>
      <Component {...props} />
    </div>
    {!props.noCSVExport && (
      <div className="text-center" id="csv-export">
        <ExportToCSVComponent {...props} />
      </div>
    )}
  </div>
)
export default enhance(wrapHOC(TransactionTable))
