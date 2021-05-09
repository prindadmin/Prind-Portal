import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../../Data/Strings'

class NoFoundationsIDBanner extends Component {
  static propTypes = {
    user: PropTypes.shape({
      details: PropTypes.shape({
        foundationsID: PropTypes.string
      })
    }).isRequired
  }

  render () {
    const { user } = this.props

    if (user.details === undefined) {
      return null;
    }

    if (!user.details.foundationsID) {
      return (
        <div id="no-foundations-id-banner" className="row full-width" onClick={(e) => this.props.history.push("/foundations")}>
          <p>{Strings.NO_FOUNDATIONS_ID_BANNER_TEXT}</p>
        </div>
      )
    }

    return null;
  }
}

export default NoFoundationsIDBanner
