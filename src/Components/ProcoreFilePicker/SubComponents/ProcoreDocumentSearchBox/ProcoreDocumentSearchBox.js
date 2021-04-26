import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Tools

// Data
//import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'
//import LoadingSpinner from '../../Components/LoadingSpinner'

// Components

// Functions
//import CanUseWebP from '../../Functions/CheckIfWebpSupported'

export class ProcoreDocumentSearchBox extends Component {
  static propTypes = {
    procore: PropTypes.shape({
      searchTerm: PropTypes.string.isRequired
    }).isRequired,
    updateSearchTerm: PropTypes.func.isRequired
  }

  handleInputChange = (event) => {
    this.props.updateSearchTerm(event.target.value)
  }

  getSearchBox = () => {
    return (
      <input
        id="search"
        name="search"
        type="text"
        placeholder={ Strings.PLACEHOLDER_SEARCH }
        value={this.props.procore.searchTerm}
        onChange={this.handleInputChange}
        className={ this.props.procore.searchTerm === '' ? "default" : "filled" }/>
    )
  }

  render () {
    return (
      <div id='procore-search-box' className=''>
        { this.getSearchBox() }
      </div>
    )
  }
}

export default ProcoreDocumentSearchBox
