import React from 'react'

import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import Modal from 'react-bootstrap/lib/Modal'

import {withRouter} from 'react-router'
import {injectIntl} from 'react-intl'

import {searchStrToPath} from '../../lib/search'
import {isSecretKey} from '../../lib/stellar/utils'

const HelpModal = props => (
  <Modal id="help-modal" show={props.show} onHide={props.handleCloseFn}>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg" style={{color: '#dce2ec'}}>
        Search Help
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{color: '#96a2b4'}}>
      <h4>Search By:</h4>
      <br />
      {/* <div>
        <h5>Stellar Address</h5>
        Also called a{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.stellar.org/developers/guides/concepts/federation.html#stellar-addresses"
        >
          Stellar federated address
        </a>
        <img
          src={`${process.env.PUBLIC_URL}/search/search_stellar_address.png`}
          alt="search by ledger"
        />
      </div> */}
      <div>
        <h5>Account ID</h5>
        Also called a Public Key or Public Address
        <img
          src={`${process.env.PUBLIC_URL}/search/search_account_public.png`}
          alt="search by public account address"
          width="100%"
        />
      </div>
      {/* <div>
        <h5>Anchor Name</h5>
        <div>
          as listed on the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://steexp.com/anchors"
          >
            Anchors Page
          </a>
        </div>
        <div>
          <br />
          Full name:
          <br />
          <img
            src={`${process.env.PUBLIC_URL}/search/search_anchor_name_full.png`}
            alt="search by anchor full name"
          />
        </div>
        <div style={{marginTop: 20}}>
          Partial name:
          <br />
          <img
            src={`${
              process.env.PUBLIC_URL
            }/search/search_anchor_name_partial.png`}
            alt="search by anchor partial name"
          />
        </div>
      </div>
      <div>
        <h5>Asset Code</h5>
        <img
          src={`${process.env.PUBLIC_URL}/search/search_asset.png`}
          alt="search by asset code"
        />
      </div> */}
      <div>
        <h5>Transaction Hash</h5>
        <img
          src={`${process.env.PUBLIC_URL}/search/search_tx_hash.png`}
          alt="search by transaction hash"
          width="100%"
        />
      </div>
      <div>
        <h5>Ledger</h5>
        <img
          src={`${process.env.PUBLIC_URL}/search/search_ledger.png`}
          alt="search by ledger"
        />
      </div>
      <hr />
      <h4>OpenSearch:</h4>
      <div>
        Pi Blockexplorer supports{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://developer.mozilla.org/en-US/docs/Web/OpenSearch"
        >
          OpenSearch
        </a>
        . This allows you to search directly from your browser search box or
        search bar. You should see something like the following when you
        navigate to Pi Blockexplorer then open the search box. Install it from
        there:
        <br />
        <img
          src="https://user-images.githubusercontent.com/1477978/33513399-8cf8ac52-d774-11e7-9585-ddc5467a5a2d.png"
          alt="search by transaction hash"
          width="80%"
        />
      </div>
    </Modal.Body>
  </Modal>
)

class SearchBox extends React.Component {
  state = {
    searchStr: '',
    showHelp: false,
  }

  constructor(props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({show: false})
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({show: true})
  }

  searchHandler = event => {
    event.preventDefault()
    const matchPath = searchStrToPath(this.state.searchStr)
    this.props.history.push(matchPath)
    // #62 security: clear search box if user put the secret key there
    if (isSecretKey(this.state.searchStr)) {
      this.setState({searchStr: ''})
    }
  }

  render() {
    const {formatMessage} = this.props.intl
    return (
      <Grid>
      <Row>
        <Col id="Search-Container">
        <form onSubmit={this.searchHandler}>
          <InputGroup>
            <FormControl
              type="text"
              onChange={e => this.setState({searchStr: e.target.value})}
              placeholder={formatMessage({id: 'search.placeHolder'})}
              value={this.state.searchStr}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="search" onClick={this.searchHandler} />
            </InputGroup.Addon>
            <InputGroup.Addon>
              <Glyphicon
                className="info-icon"
                glyph="info-sign"
                onClick={this.handleClick}
              />
            </InputGroup.Addon>
          </InputGroup>
        </form>
        {this.state.show && (
          <HelpModal handleCloseFn={this.handleClose} show={this.state.show} />
        )}
      </Col>
    </Row>
  </Grid>
    )
  }
}

export default injectIntl(withRouter(SearchBox))
