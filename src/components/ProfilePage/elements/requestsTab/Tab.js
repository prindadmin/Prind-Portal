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
        <div id="requests-tab-container">
          This will soon contain all the requests the user has received
        </div>
      </div>
    )
  }
}

export default Page
