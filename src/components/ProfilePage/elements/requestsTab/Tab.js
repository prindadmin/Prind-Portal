import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as strings from '../../../../data/Strings'

import {
  RequestTile
} from './elements'

import ItemIcon from '../../../common/ItemIcon'

// TODO: Handle  other types of request (sign document)

export class Page extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super()
  }


  hasContent = () => {

    const { user } = this.props

    return (
      <React.Fragment>
        {
          user.projectInvitations.length > 0 ? user.projectInvitations.map((request, index) => {
            return (
              <div key={index} className="col-md-12 col-lg-6 col-xl-4">
                <RequestTile requestDetails={request} />
              </div>
            )
          }) : null
        }
      </React.Fragment>
    )
  }


  hasNoContent = () => {
    return (
      <div className='no-requests-container fill'>
        <div className='no-requests'>
          <ItemIcon size='6x' type='ticked' />
          <p>{strings.NO_REQUESTS}</p>
        </div>
      </div>
    )
  }


  render() {

    const { user } = this.props

    return(
      <div className="tab-pane active">
        <div className='row'>
          <div id="requests-tab-container">
            {
              user.projectInvitations.length === 0 ? this.hasNoContent() : this.hasContent()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Page
