import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import * as strings from '../../../../data/Strings'

export class Page extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {

    return(
      <div className="tab-pane active">
        <div id="history-tab-container">
          This will soon contain all the projects the user has joined (and when), all the documents uploaded, and all the documents signed
        </div>
      </div>
    )
  }
}

export default Page
