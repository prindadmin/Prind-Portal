import React, { Component } from 'react'

import * as Strings from '../../../Data/Strings'

class NoFoundationsIDBanner extends Component {

  render () {

    const { user } = this.props

    if (user === undefined) {
      return null;
    }

    if (user.details === undefined) {
      return null;
    }

    if (user.details.foundationsID === null) {
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
