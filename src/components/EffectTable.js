mport React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage} from 'react-intl'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import {withPaging} from './shared/Paging'
import {withSpinner} from './shared/Spinner'
import Effect from './Effect'
import CSVExport from './shared/CSVExport'
const EffectTable = ({
  parentRenderTimestamp,
  records,
	@@ -34,9 +31,9 @@ const EffectTable = ({
            </th>
          )}
          <th>
                        <FormattedMessage id="type" />
          </th>
         <th>
            <FormattedMessage id="details" />
          </th>
          <th>
            <FormattedMessage id="transaction" />
          </th>
          <th>
            <FormattedMessage id="time" />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {records.map(effect => {
          return (
            <Effect
              key={effect.id}
              effect={effect}
              effectURLFn={server.effectURL}
              parentRenderTimestamp={parentRenderTimestamp}
              showAccount={showAccount}
            />
          )
        })}
      </tbody>
    </Table>
    <div className="text-center" id="csv-export">
      <ExportToCSVComponent server={server} account={account} />
    </div>
  </div>
)
EffectTable.propTypes = {
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array.isRequired,
  server: PropTypes.object.isRequired,
  showAccount: PropTypes.bool,
}
const rspRecToPropsRec = record => mapKeys(record, (v, k) => camelCase(k))
const fetchRecords = ({account, limit, op, server, tx}) => {
  const builder = server.effects()
  if (account) builder.forAccount(account)
	@@ -86,7 +81,6 @@ const fetchRecords = ({account, limit, op, server, tx}) => {
  builder.order('desc')
  return builder.call()
}
const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropsRec),
  withSpinner()
)
const ExportToCSVComponent = withDataFetchingAllContainer(fetchRecords)(
  CSVExport
)
export default enhance(EffectTable)
