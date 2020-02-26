import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import * as strings from '../../../../data/Strings'

import {
  RequestTile
} from './elements'

// TODO: Handle  other types of request (sign document)
// TODO: Add in a "no requests" placeholder

export class Page extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getProjectInvitations: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
  }


  render() {

    const { user } = this.props

    return(
      <div className="tab-pane active">
        <div className='row'>
          <div id="requests-tab-container">
            {
              user.projectInvitations.length > 0 ? user.projectInvitations.map((request, index) => {
                return (
                  <div className="col-md-12 col-lg-6 col-xl-4">
                    <RequestTile id={index} requestDetails={request} />
                  </div>
                )
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Page
